import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { EmailAuthProvider } from '@firebase/auth-types';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(fb: FormBuilder, private authService: AuthService,
      private router: Router, private zone: NgZone, private afa: AngularFireAuth) {
    this.loginForm = fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.afa.auth.getRedirectResult().then(result => {
      if (result.user) {
        this.router.navigate(['/admin']);
      }
    });
  }

  login() {
    // this.authService.login(this.loginForm.value['email'], this.loginForm.value['password']);
    this.authService.signInRegular(this.loginForm.value['email'], this.loginForm.value['password'])
      .then((res) => {
        this.router.navigate(['admin']);
      })
      .catch((err) => console.log('error: ' + err));
  }
}
