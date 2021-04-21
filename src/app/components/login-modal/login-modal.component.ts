import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import axios from 'axios';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/services';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
})
export class LoginModalComponent implements OnInit {
  public loginResult = new Subject<any>();
  step: 1 | 2;
  account = new FormControl('');
  code = new FormControl('');
  agreeTerms = new FormControl(false);
  message: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.step = 1;
  }
  login() {
    axios
      .post(environment.LOGIN_URL, {
        account: this.account.value,
      })
      .then((response) => {
        const { data } = response;
        const { success, message, result } = data;
        if (success) {
          this.step = 2;
          localStorage.setItem('token', result);
          return;
        }
        this.message = message;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  focusClear() {
    this.message = '';
  }
  async verifyCode() {
    const { success, message, result } = await this.userService
      .verifyCode(this.code.value)
      .toPromise();
    if (success) {
      this.loginResult.next({ success, result });
      return;
    }
    this.message = message;
  }
}
