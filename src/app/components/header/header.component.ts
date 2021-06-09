import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ROUTER } from 'src/app/constant';
import { UserService } from 'src/app/services';
import { closeModal } from 'src/app/utils';
import { LoginModalComponent } from '../.';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  modalRef: BsModalRef;
  userLogin: boolean = false;
  iconURL: string = '';
  constructor(
    private modalService: BsModalService,
    private userService: UserService,
    private toastr: ToastrService,
    private route: Router,
  ) {}
  ngOnInit(): void {
    this.userLogin = !!localStorage.getItem('token');
    if (this.userLogin) {
      this.userService.me().subscribe((data) => {
        if (data) {
          this.iconURL = data.icon_url ? data.icon_url : '';
          return;
        }
        localStorage.clear();
        this.route.navigateByUrl(ROUTER.HOME_URL);
        return;
      });
    }
  }

  popUserOptions() {
    const localToken = localStorage.getItem('token');
    if (!localToken) {
      this.modalRef = this.modalService.show(LoginModalComponent);
      this.modalRef.content.loginResult.subscribe(({ success, result }) => {
        if (success) {
          this.modalRef.hide();
          this.userLogin = true;
          this.iconURL = result.icon_url ? result.icon_url : '';
          const { onboard } = result;
          if (!onboard) {
            this.route.navigateByUrl(ROUTER.USER_EDIT_URL);
          }
        } else {
          // TODO toast fail infomation
          localStorage.clear();
        }
      });
    }
  }
  async logout() {
    let ref;
    const confirm = await new Promise<boolean>((resolve, reject) => {
      ref = this.modalService.show(ConfirmModalComponent, {
        initialState: {
          title: 'Logout',
          content: `Do you want to logout?`,
          onCancel: () => resolve(false),
          onSubmit: () => resolve(true),
        },
      });
    });

    if (confirm) {
      localStorage.clear();
      this.iconURL = '';
      this.route.navigateByUrl(ROUTER.HOME_URL);
    }
    await closeModal(ref);
  }
}
