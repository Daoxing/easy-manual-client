import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-group-options',
  templateUrl: './group-options.component.html',
  styleUrls: ['./group-options.component.css'],
})
export class GroupOptionsComponent implements OnInit {
  @Input() options: any[];
  @Input() currentOption: any;
  @Output() change = new EventEmitter<any>();
  _expand = false;
  readonly publicOption = {
    title: 'public',
  };
  readonly privateOption = {
    title: 'private',
  };
  constructor() {}

  ngOnInit(): void {
    if (!this.currentOption) {
      this.currentOption = { title: 'public' };
    }
  }

  addNewGroup() {
    // pop up add new group option modal
  }

  choose($event) {
    this.currentOption = $event;
    this._expand = false;
    this.change.emit(this.currentOption);
  }

  expandList() {
    this._expand = !this._expand;
  }
}
