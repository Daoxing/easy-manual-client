import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { GroupService, UserService } from 'src/app/services';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  @Input() isCreator: boolean = false;
  @Input() groupId: string = '';
  @Output() afterQueryUsers: EventEmitter<any> = new EventEmitter();
  users: string[] = [];
  endOfUsers: boolean = false;
  totalCount: number = 0;
  defaultSort: any = {
    field: 'joined_tms',
    order: 'ASC',
  };

  defaultPage: any = {
    pageNo: 1,
    pageCount: 10,
  };
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // get joined members
    if (this.groupId.length) {
      this.userService
        .usersInGroup(this.groupId, this.defaultPage, this.defaultSort)
        .subscribe((data) => {
          const { totalCount, users } = data;
          this.users = users;
          this.totalCount = totalCount;
          this.endOfUsers = this.checkEndOfUsers(users);
          this.afterQueryUsersEmit();
        });
    }
  }

  moreUsers() {
    this.defaultPage.pageNo = this.defaultPage.pageNo + 1;
    this.getMoreUsers();
  }
  private getMoreUsers() {
    if (this.groupId.length) {
      this.userService
        .usersInGroup(this.groupId, this.defaultPage, this.defaultSort)
        .subscribe((data) => {
          const { totalCount, users } = data;
          this.users = this.users.concat(users);
          this.totalCount = totalCount;
          this.endOfUsers = this.checkEndOfUsers(users);
          this.afterQueryUsersEmit();
        });
    }
  }

  private checkEndOfUsers(users: any[]) {
    return (
      this.totalCount <=
      users.length + (this.defaultPage.pageNo - 1) * this.defaultPage.pageCount
    );
  }
  private afterQueryUsersEmit() {
    this.afterQueryUsers.emit({
      listType: 'usersInGroup',
      totalCount: this.totalCount,
    });
  }
}
