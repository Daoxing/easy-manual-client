import { Component, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css'],
})
export class ConfirmModalComponent implements OnInit {
  title: string;
  content: string | TemplateRef<void>;
  cancelText = 'Cancel';
  confirmText = 'Confirm';
  constructor() {}

  ngOnInit(): void {}

  onCancel() {}

  onSubmit() {}
}
