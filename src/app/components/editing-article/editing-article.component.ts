import { Component, OnInit } from '@angular/core';
import * as Quill from 'quill';
@Component({
  selector: 'app-editing-article',
  templateUrl: './editing-article.component.html',
  styleUrls: ['./editing-article.component.css'],
})
export class EditingArticleComponent implements OnInit {
  editor: any;
  constructor() {}

  ngOnInit(): void {
    this.editor = new Quill('#editor');
    this.editor.addModule('toolbar', { container: '#toolbar' });
  }
}
