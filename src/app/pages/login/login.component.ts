import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: UserModel;
  rememberMe = false;

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.user = new UserModel();

    if (localStorage.getItem('email')) {
      this.user.email = localStorage.getItem('email');
      this.rememberMe = true;
    }
  }

  login(loginForm: NgForm) {
    if (loginForm.invalid) { return; }

    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Please wait..'
    });
    Swal.showLoading();

    this.auth.login(this.user)
    .subscribe(resp => {
      Swal.close();

      if (this.rememberMe) {
        localStorage.setItem('email', this.user.email);
      }

      this.router.navigateByUrl('/home');
    }, (err) => {
      Swal.fire({
        allowOutsideClick: false,
        type: 'error',
        title: 'Failed to authenticate',
        text: err.error.error.message
      });
    });
  }
}
