import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { ROUTER } from 'src/app/constant';
import { UserService } from 'src/app/services';
import { getDiff } from 'src/app/utils';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  iconURL: string = '';
  username = new FormControl('');
  displayName = new FormControl('');
  email = new FormControl('');
  phoneNumber = new FormControl('');
  gender = new FormControl('UNKNOWN');
  enableSubmitButton: boolean = false;
  getUserInfo: any;
  onboard: boolean = false;

  text: string = '';
  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private route: Router,
  ) {}

  ngOnInit(): void {
    this.userService.me().subscribe((data) => {
      this.iconURL = data.icon_url;
      this.username.setValue(data.user_nme);
      this.displayName.setValue(data.display_nme);
      this.email.setValue(data.email_address);
      this.phoneNumber.setValue(data.phone_nbr);
      this.gender.setValue(data.gender);
      this.onboard = data.onboard;
      const {
        user_nme,
        display_nme,
        email_address,
        phone_nbr,
        icon_url,
        gender,
      } = data;

      this.getUserInfo = {
        user_nme,
        display_nme,
        email_address,
        phone_nbr,
        icon_url,
        gender,
      };
    });
  }

  setGender(value) {
    this.gender.setValue(value);
  }
  enableSubmit() {
    const currentUserInfo = this.getCurrentUserInfo();
    const diff = getDiff(this.getUserInfo, currentUserInfo);
    this.enableSubmitButton =
      !_.isEmpty(diff) && !_.isEmpty(this.username.value);
  }

  updateUser() {
    const currentUserInfo = this.getCurrentUserInfo();
    const userInfo = getDiff(this.getUserInfo, currentUserInfo);
    this.userService.updateUser(userInfo).subscribe((data) => {
      const { success, message } = data;
      if (success) {
        this.route.navigate([ROUTER.USER_URL], {
          queryParams: { id: data.user_id },
        });
        return;
      }
      this.toastr.show(message);
    });
  }
  private getCurrentUserInfo() {
    return {
      user_nme: this.username.value,
      display_nme: this.displayName.value,
      email_address: this.email.value,
      phone_nbr: this.phoneNumber.value,
      icon_url: this.iconURL,
      gender: this.gender.value,
    };
  }
}
