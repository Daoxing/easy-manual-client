import { Component, OnInit } from '@angular/core';
import * as Quill from 'quill';
import { ArticleService } from '../../services';
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
  group: any;
  articleName: string = '';
  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.editor = new Quill('#editor', {
      modules: { toolbar: '#toolbar' },
      theme: 'snow',
    });
  }

  setGroup(selectGroup: any) {
    // set new group
  }

  onSave() {
    // check title
    // disable save button
    // save to backend
    // return message
    // enable save button
    this.articleService.createArticle({
      article_nme: this.articleName,
      article_content: this.editor.root.innerHTML,
      only_me: false,
      group_id: null,
    });
  }
}
