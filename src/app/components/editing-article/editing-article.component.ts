import { Component, OnInit } from '@angular/core';
import * as Quill from 'quill';
import { ArticleService, UserService } from '../../services';
import {
  PRIVATE_GROUP,
  PUBLIC_GROUP,
  ROUTER,
  toolbarOptions,
} from '../../constant';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { getDiff } from '../../utils';
import _ from 'lodash';
interface IArticle {
  article_nme?: string;
  article_content?: string;
}
@Component({
  selector: 'app-editing-article',
  templateUrl: './editing-article.component.html',
  styleUrls: ['./editing-article.component.css'],
})
export class EditingArticleComponent implements OnInit {
  article: IArticle;
  editor: any;
  groupOptions: any[];
  currentGroup: any;
  articleName = new FormControl('');
  editable: boolean = false;
  mode: string = 'new';
  oldArticle;
  articleId: string = '';

  constructor(
    private articleService: ArticleService,
    private userService: UserService,
    private router: ActivatedRoute,
    private route: Router,
  ) {}

  ngOnInit(): void {
    const path = this.router.snapshot.routeConfig.path;
    this.mode = path.substr(8);
    if (!['new', 'edit'].includes(this.mode)) {
      this.route.navigateByUrl(ROUTER.PAGE_NOT_FOUND_URL);
      return;
    }
    this.editor = new Quill('#editor', {
      modules: { toolbar: toolbarOptions },
      theme: 'snow',
    });
    if (this.mode === 'edit') {
      this.queryArticle();
    }

    if (this.mode === 'new') {
      this.currentGroup = PUBLIC_GROUP;
    }

    // set groups
    this.userService.me().subscribe((data) => {
      const { my_groups = [] } = data;
      this.groupOptions = my_groups;
    });
  }

  setGroup(selectGroup: any) {
    // set new group
    this.currentGroup = selectGroup;
  }

  onSave() {
    if (this.mode === 'new') {
      this.createArticle();
    } else {
      this.updateArticle();
    }
  }

  private createArticle() {
    this.articleService
      .createArticle({
        article_nme: this.articleName.value,
        article_content: this.editor.root.innerHTML,
        only_me: false,
        group_id: null,
      })
      .subscribe((data) => {
        const { success, message, result } = data;
        // if success , direct to edit page
        if (success) {
          const { article_id } = result;
          this.route.navigate([ROUTER.ARTICLE], {
            queryParams: { id: article_id },
          });
          return;
        }
        // if wrong toast message
      });
  }

  private updateArticle() {
    // set group
    const only_me = this.currentGroup === PRIVATE_GROUP;
    const group_id =
      only_me || this.currentGroup === PUBLIC_GROUP
        ? null
        : this.currentGroup.group_id;
    const updateArticle = {
      article_nme: this.articleName.value,
      article_content: this.editor.root.innerHTML,
      only_me,
      group_id,
    };

    const accountInfo = getDiff(this.oldArticle, updateArticle);
    if (!_.isEmpty(accountInfo)) {
      accountInfo.article_id = this.articleId;
      this.articleService.updateArticle(accountInfo).subscribe((data) => {
        const { success, message, result } = data;
        if (success) {
          // to article page
          const { article_id } = result;
          this.route.navigate([ROUTER.ARTICLE], {
            queryParams: { id: article_id },
          });
          return;
        }
        // Toast error message
      });
      return;
    }

    // toast success
  }

  private queryArticle() {
    // get id
    this.router.queryParams.subscribe(({ id }) => {
      this.articleService.getArticle(id).subscribe(({ result, success }) => {
        if (success) {
          this.articleId = id;
          // Set content
          const {
            article_nme = '',
            group = null,
            only_me,
            article_content,
          } = result;
          this.articleName.setValue(article_nme);
          // set group
          if (only_me) {
            this.currentGroup = PRIVATE_GROUP;
          } else {
            this.currentGroup = group ? group : PUBLIC_GROUP;
          }
          const group_id =
            only_me || this.currentGroup === PUBLIC_GROUP
              ? null
              : this.currentGroup.group_id;
          this.oldArticle = {
            article_nme,
            only_me,
            article_content,
            group_id,
          };
          // set content
          this.editor.root.innerHTML = article_content;
        } else {
          // to page not found
          this.route.navigateByUrl(ROUTER.PAGE_NOT_FOUND_URL);
        }
      });
    });
  }
}
