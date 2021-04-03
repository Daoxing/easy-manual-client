import { Component, OnInit } from '@angular/core';
import * as Quill from 'quill';

@Component({
  selector: 'app-editing-article',
  templateUrl: './editing-article.component.html',
  styleUrls: ['./editing-article.component.css'],
})
export class EditingArticleComponent implements OnInit {
  editor: any;
  groupOptions: any[];
  group: any;
  constructor() {}

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
  }
}
