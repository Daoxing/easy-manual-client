import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PRIVATE_GROUP, PUBLIC_GROUP } from 'src/app/constant';
import { NewGroupComponent } from '../new-group/new-group.component';

@Component({
  selector: 'app-group-options',
  templateUrl: './group-options.component.html',
  styleUrls: ['./group-options.component.css'],
})
export class GroupOptionsComponent implements OnInit {
  @Input() set setOptions(v: any[]) {
    this.options = v ? [...v] : [];
  }
  @Input() currentOption: any;
  @Output() change = new EventEmitter<any>();
  _expand = false;
  options: any[] = [];
  readonly publicOption = PUBLIC_GROUP;
  readonly privateOption = PRIVATE_GROUP;
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {
    if (!this.currentOption) {
      this.currentOption = PUBLIC_GROUP;
    }
  }

  addNewGroup() {
    // pop up add new group option modal
    this.modalRef = this.modalService.show(NewGroupComponent);
    this.modalRef.content.newGroupResult.subscribe((data) => {
      const { success, result } = data;
      if (success) {
        this.options.unshift(result);
        this.modalRef.hide();
        this.currentOption = result;
      } else {
        // toast error message
      }
    });
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
