import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import _ from 'lodash';
import { PRIVATE_GROUP, PUBLIC_GROUP, ROUTER } from 'src/app/constant';
import { ArticleService, UserService } from 'src/app/services';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  articleHTML: string = '';
  articleId: string = '';
  articleName: string = '';
  creatorId: string = '';
  creatorUserName: string = '';
  groupId: string = '';
  groupName: string = '';
  iconURL: string = '';
  editable: boolean = false;
  success: boolean = false;
  hasGroup: boolean = false;
  constructor(
    private articleService: ArticleService,
    private userService: UserService,
    private router: ActivatedRoute,
    private route: Router,
  ) {}

  ngOnInit(): void {
    this.queryArticle();
  }
  markArticle() {
    // mark article
  }

  private queryArticle() {
    // get id
    this.router.queryParams.subscribe(({ id }) => {
      if (!id) {
        // to page not found
        this.route.navigateByUrl(ROUTER.PAGE_NOT_FOUND_URL);
        return;
      }

      this.articleService
        .getArticle(id)
        .subscribe(({ result, success, message }) => {
          if (success) {
            // set content
            this.articleHTML = result.article_content;
            this.articleId = result.article_id;
            this.articleName = result.article_nme;

            // set creator
            this.creatorId = result.created_user.user_id;
            this.creatorUserName = result.created_user.user_nme;
            this.iconURL = result.created_user.icon_url;
            // set group
            const group = this.getGroup(result);
            this.hasGroup = ![PUBLIC_GROUP, PRIVATE_GROUP].includes(group);

            this.groupId = group.group_id;
            this.groupName = group.group_nme;
            // set edit button
            this.editable = result.editable;
            this.success = success;
            return;
          }
          // to page not found
          this.route.navigateByUrl(ROUTER.PAGE_NOT_FOUND_URL);
        });
    });
  }

  private getGroup(result: any) {
    if (_.get(result, 'only_me')) {
      return PRIVATE_GROUP;
    }
    const group = _.get(result, 'group');
    if (!group) {
      return PUBLIC_GROUP;
    }

    return group;
  }
}
