import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user: UserModel;
  rememberMe = false;
  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.user = new UserModel();

   }

   onSubmit(registrationForm: NgForm) {
     if (registrationForm.invalid) {
       return;
     }

     Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Please wait...'
    });
     Swal.showLoading();

     this.auth.newUser(this.user)
     .subscribe( resp => {
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
