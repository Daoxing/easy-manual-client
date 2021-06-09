import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
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
export class LoginModalComponent implements OnInit, OnChanges, OnDestroy {
  public loginResult = new Subject<any>();
  step: 1 | 2;
  account = new FormControl('');
  code = new FormControl('');
  agreeTerms = new FormControl(false);
  message: string = '';
  hasSendCode = true;
  counter: number = 60;
  intervalId;
  loginSuccess = false;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.step = 1;
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.counter.currentValue <= 0) {
      this.hasSendCode = false;
      this.clearTimer();
    }
  }
  ngOnDestroy() {
    if (!this.loginSuccess) {
      localStorage.clear();
    }
    this.clearTimer();
  }
  login() {
    return axios
      .post(environment.LOGIN_URL, {
        account: this.account.value,
      })
      .then((response) => {
        const { data } = response;
        const { success, message, result } = data;
        if (success) {
          this.step = 2;
          localStorage.setItem('token', result);
          this.hasSendCode = true;
          this.countDown();
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
      this.loginSuccess = success;
      this.loginResult.next({ success, result });
      return;
    }
    this.message = message;
  }
  resendCode() {
    this.login().then((response) => {
      this.hasSendCode = true;
      this.countDown();
    });
  }
  backToLogin() {
    this.step = 1;
    this.clearTimer();
  }
  private clearTimer() {
    clearInterval(this.intervalId);
  }
  private countDown() {
    this.counter = 60;
    this.intervalId = window.setInterval(() => {
      if (this.counter) {
        this.counter = this.counter - 1;
      } else {
        this.hasSendCode = false;
      }
    }, 1000);
  }
}
