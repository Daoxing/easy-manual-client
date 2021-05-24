import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { GroupService } from 'src/app/services';
import { closeModal } from 'src/app/utils';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css'],
})
export class GroupListComponent implements OnInit {
  @Input() enableAction: boolean = false;
  groups: any[] = [];
  @Output() afterQueryGroups: EventEmitter<any> = new EventEmitter();
  totalCount: number = 0;
  endOfGroups: boolean = false;
  defaultSort: any = {
    field: 'group_nme',
    order: 'ASC',
  };

  defaultPage: any = {
    pageNo: 1,
    pageCount: 10,
  };

  constructor(
    private groupService: GroupService,
    private toastr: ToastrService,
    private modalService: BsModalService,
  ) {}

  ngOnInit(): void {
    this.initQueryGroups();
  }

  sort(field: string) {
    if (this.defaultSort.field === field) {
      this.defaultSort.order =
        this.defaultSort.order === 'ASC' ? 'DESC' : 'ASC';
    } else {
      this.defaultSort.order = 'ASC';
    }
    this.defaultSort.field = field;
    this.initQueryGroups();
  }

  moreGroups() {
    this.defaultPage.pageNo = this.defaultPage.pageNo + 1;
    this.getMoreGroups();
  }

  async leaveGroup(groupId: string, groupName: string) {
    let ref;
    const confirm = await new Promise<boolean>((resolve, reject) => {
      ref = this.modalService.show(ConfirmModalComponent, {
        initialState: {
          title: 'Leave Group',
          content: `Do you want to leave the group?`,
          onCancel: () => resolve(false),
          onSubmit: () => resolve(true),
        },
      });
    });

    if (confirm) {
      this.groupService.leaveGroup(groupId).subscribe((data) => {
        const { success } = data;
        if (success) {
          this.groups = this.groups.filter((g) => g.group_id != groupId);
          return;
        }
        this.toastr.error('Something went wrong!');
      });
    }
    await closeModal(ref);
  }

  private checkEndOfGroups(groups: any[]) {
    return (
      this.totalCount <=
      groups.length + (this.defaultPage.pageNo - 1) * this.defaultPage.pageCount
    );
  }
  private initQueryGroups() {
    this.groupService
      .getMyJoinedGroups(this.defaultPage, this.defaultSort)
      .subscribe((data) => {
        this.groups = data.groups;
        this.totalCount = data.totalCount;
        this.endOfGroups = this.checkEndOfGroups(data.groups);
        this.afterQueryGroupsEmit();
      });
  }

  private getMoreGroups() {
    this.groupService
      .getMyJoinedGroups(this.defaultPage, this.defaultSort)
      .subscribe((data) => {
        this.groups = this.groups.concat(data.groups);
        this.totalCount = data.totalCount;
        this.endOfGroups = this.checkEndOfGroups(data.groups);
        this.afterQueryGroupsEmit();
      });
  }
  private afterQueryGroupsEmit() {
    this.afterQueryGroups.emit({
      listType: 'myGroups',
      totalCount: this.totalCount,
    });
  }
}
