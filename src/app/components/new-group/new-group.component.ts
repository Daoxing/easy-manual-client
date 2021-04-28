import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { GroupService } from '../../services';
@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css'],
})
export class NewGroupComponent implements OnInit {
  public newGroupResult = new Subject<any>();
  groupName = new FormControl('');
  groupIntro = new FormControl('');
  message: string = '';
  constructor(private groupService: GroupService) {}

  ngOnInit(): void {}
  focusClear() {}
  createNewGroup() {
    const groupInfo = {
      group_nme: this.groupName.value,
      group_intro: this.groupIntro.value,
    };
    this.groupService.createGroup(groupInfo).subscribe((result) => {
      this.newGroupResult.next(result);
    });
  }
}
