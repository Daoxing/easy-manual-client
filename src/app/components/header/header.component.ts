import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services';
import { LoginModalComponent } from '../.';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  modalRef: BsModalRef;
  userLogin: any;
  iconURL: string = '';
  constructor(
    private modalService: BsModalService,
    private userService: UserService,
    private toastr: ToastrService,
  ) {}
  ngOnInit(): void {
    this.userLogin = !!localStorage.getItem('token');
    if (this.userLogin) {
      this.userService.me().subscribe((data) => {
        this.iconURL = data.icon_url;
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
          // TODO add icon url
        } else {
          // TODO toast fail infomation
          localStorage.clear();
        }
      });
    }
  }
}
