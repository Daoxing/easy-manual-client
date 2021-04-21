import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoginModalComponent } from '../.';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  modalRef: BsModalRef;
  userLogin: any;
  constructor(private modalService: BsModalService) {}
  ngOnInit(): void {
    this.userLogin = !!localStorage.getItem('token');
  }

  popUserOptions() {
    // TODO remove clear function
    localStorage.clear();
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
