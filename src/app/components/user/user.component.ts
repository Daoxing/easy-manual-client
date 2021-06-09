import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTER } from 'src/app/constant';
import { ArticleService, UserService } from 'src/app/services';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  userMode: 'me' | 'user' = 'me';
  userInfo = {
    user_nme: '',
    email_address: '',
    phone_nbr: '',
    icon_url: '',
    gender: '',
  };
  accessibleArticlesTotalCount = 0;
  myArticlesTotalCount = 0;
  myGroupsTotalCount = 0;
  mySavedArticlesTotalCount = 0;
  constructor(
    private elemRef: ElementRef,
    private router: ActivatedRoute,
    private route: Router,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.queryUser();
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

  queryUser() {
    this.router.queryParams.subscribe(({ id }) => {
      if (!id) {
        this.userMode = 'me';
        this.queryCurrentUser();
        return;
      }
      this.userMode = 'user';
      // get user by id
      this.queryUserById(id);
    });
  }

  queryCurrentUser() {
    this.userService.me().subscribe((data) => {
      if (!data) {
        // to page not found
        this.route.navigateByUrl(ROUTER.PAGE_NOT_FOUND_URL);
        return;
      }

      this.userInfo = data;
    });
  }
  queryUserById(id: string) {
    this.userService.findUserById(id).subscribe((data) => {
      const { success, result } = data;
      if (!success) {
        // to page not found
        this.route.navigateByUrl(ROUTER.PAGE_NOT_FOUND_URL);
        return;
      }

      this.userInfo = result;
    });
  }
  refreshArticleList($event) {
    const { listType, totalCount } = $event;

    if (listType === 'accessibleArticles') {
      this.accessibleArticlesTotalCount = totalCount;
    }
    if (listType === 'myAllArticles') {
      this.myArticlesTotalCount = totalCount;
    }
    if (listType === 'myGroups') {
      this.myGroupsTotalCount = totalCount;
    }
    if (listType === 'mySavedArticles') {
      this.mySavedArticlesTotalCount = totalCount;
    }
  }
}
