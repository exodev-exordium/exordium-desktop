import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { jarallax } from 'jarallax';

import * as $ from 'jquery';

import { AuthService } from 'app/core/services/exordium/auth/auth.service';
import { UserService } from 'app/core/services/exordium/client/user.service';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent implements OnInit {
  signinForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.signinForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      remember: [null],
      recaptcha: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    jarallax(document.querySelectorAll('.jarallax'), {
      speed: 0.6
    });
  }

  get f() {
    return this.signinForm.controls;
  }

  onSubmit(): void {
    const srcButton = $('.submitSignin');
    srcButton.attr('disabled', true);
    srcButton.addClass('m-progress');

    if (this.signinForm.invalid) {
      this.toastr.error('Please make sure you fill out all the fields correctly, then try signing in again...');
    } else {
      this.authService.signin(this.signinForm.value).subscribe((res) => {
        this.toastr.success(`You have successfully signed in, ${res.username.charAt(0).toUpperCase() + res.username.slice(1)}!`);

        localStorage.setItem('access_token', res.token);

        this.userService.getUserDataBasic().subscribe((res) => {
          this.router.navigate([`/dashboard`]);
        });
      }, (err) => {
        this.toastr.error('Your email and password didn\'t match our records, please check and make sure you entered the right information!');
      });

    }

    setTimeout(() => {
      srcButton.removeAttr('disabled');
      srcButton.removeClass('m-progress');
    }, 2000);

  }

}
