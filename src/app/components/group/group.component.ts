import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTER } from 'src/app/constant';
import { GroupService, UserService } from 'src/app/services';
import { IGroup, IjoinGroupStatusEnum } from 'src/app/types';
@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
})
export class GroupComponent implements OnInit {
  groupId: string = '';
  joinedStatus: IjoinGroupStatusEnum = IjoinGroupStatusEnum.NOT_JOINED;
  theGroup: IGroup = { group_id: '' };
  amICreator: boolean = false;
  articlesInGroup: number = 0;
  usersCountInGroup: number = 0;

  constructor(
    private elemRef: ElementRef,
    private groupService: GroupService,
    private userService: UserService,
    private activeRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(({ id }) => {
      if (!id) {
        this.router.navigateByUrl(ROUTER.PAGE_NOT_FOUND_URL);
        return;
      }
      this.groupId = id;
      this.queryGroupInfoById(id);
    });
  }

  switchTab(e, index) {
    const titles: HTMLElement[] = Array.from(
      this.elemRef.nativeElement.getElementsByClassName('tab-title'),
    );

    titles.forEach((element, i) => {
      index === i
        ? element.classList.add('active-title')
        : element.classList.remove('active-title');
    });

    const contents: HTMLElement[] = Array.from(
      this.elemRef.nativeElement.getElementsByClassName('tab-content'),
    );
    contents.forEach((element, i) => {
      index === i
        ? element.classList.add('active-content')
        : element.classList.remove('active-content');
    });
  }

  refreshAfterQueryList($event) {
    const { listType, totalCount } = $event;

    if (listType === 'articlesInGroup') {
      this.articlesInGroup = totalCount;
    }
    if (listType === 'usersInGroup') {
      this.usersCountInGroup = totalCount;
    }
  }
  private queryGroupInfoById(id: string) {
    this.groupService.groupInfo(id).subscribe((data) => {
      const { success, result } = data;
      if (!success || !result) {
        this.router.navigateByUrl(ROUTER.PAGE_NOT_FOUND_URL);
        return;
      }
      // set join status
      this.joinedStatus = result.joined_group;
      // base on join status query info

      this.theGroup = result;
      if (this.joinedStatus !== IjoinGroupStatusEnum.JOINED) {
        return;
      }
      // is this current user the creator
      this.userService.me().subscribe((data) => {
        const { user_id } = data;
        this.amICreator = user_id === result.created_user.user_id;
      });
    });
  }
}
