import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../../core/services/authfirebase.service';
import { AuthService } from '../../../core/services/auth.service';

import { environment } from '../../../../environments/environment';
import { HashService } from './../../../core/services/hash.service';
import { HashRequest, HashResponse } from 'src/app/core/models/hash.models';
import * as util from '../../../shared/utils';
import {
  LoginUser,
  SessionBody,
  UserAddResponse,
  UserResponse,
  UserAddBody,
  SessionResponse,
} from 'src/app/core/models/auth.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

/**
 * Login component
 */
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;
  submitted = false;
  error = '';
  returnUrl: string;

  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public authenticationService: AuthenticationService,
    public authService: AuthService,
    private hashService: HashService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['298550', [Validators.required]],
      password: ['1234temp', [Validators.required]],
    });

    // reset login status
    // this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    // tslint:disable-next-line: no-string-literal
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    //this.onLogin();
  }

  // convenience getter for easy access to form fields
  get formControls() {
    return this.loginForm.controls;
  }

  /**
   * Form submit
   */

  async onLogin() {
    this.router.navigate(['/']);

    if (this.loginForm.invalid) {
      return;
    }

    this.generateHas();
  }

  generateSha(): string {
    const password: string = this.formControls.password.value;
    return util.getHash256(password);
  }

  generateHas() {
    let response: HashResponse;
    const request: HashRequest = {
      extension: this.formControls.email.value,
    };
    this.hashService.generateHash(request).subscribe({
      next: (hash: HashResponse) => {
        const hashRequest = hash.H + this.generateSha();
        const request: LoginUser = {
          extension: this.formControls.email.value,
          password: hashRequest,
          languageId: 1,
        };
        this.userLogin(request);
      },
    });
  }

  userLogin(request: LoginUser) {
    this.authService.userLogin(request).subscribe({
      next: (data: UserResponse) => {
        const request = this.userAddRequest(data);
        this.userAdd(request);
      },
    });
  }

  userAddRequest(data: UserResponse): UserAddBody {
    return {
      api_key: 'Se3c9raP3h3BRiRIGKvdiR1CMeWx5VC9JMOHkIu+g9s=',
      session_key: '',
      locale_Code: 'es',
      prmHash: '',
      data: {
        extension: '',
        name: `${data.Nombres} ${data.apellidos}`,
        title: `${data.Nombres} ${data.apellidos}`,
        id_device: '',
        password: '',
        mail: '',
        prefix: '',
        phone: '',
      },
    };
  }

  userAdd(request: UserAddBody) {
    this.authService.userAdd(request).subscribe({
      next: (data: UserAddResponse) => {
        const request = this.sessionAddRequest(data)
        this.sessionAdd(request);
      },
    });
  }

  sessionAdd(request: SessionBody) {
    this.authService.sessionAdd(request)
    .pipe(first())
    .subscribe({
      next: (session : any) => {
        const { data } = session 
        this.router.navigate(['/']);
        // if(data.session_key){
        //   console.log('session')
          
        // }
      },
      complete:()=>{
         //this.router.navigate(['/']);
      }
    });
  }

  sessionAddRequest(data: UserAddResponse): SessionBody {
    return {
      api_key: 'Se3c9raP3h3BRiRIGKvdiR1CMeWx5VC9JMOHkIu+g9s=',
      session_key: '',
      locale_Code: 'es',
      prmHash: '',
      data: {
        user_id: data.data._id,
        extension: '',
      },
    };
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      if (environment.defaultauth === 'fackbackend') {
        this.authService
          .login(
            this.formControls.email.value,
            this.formControls.password.value
          )
          .pipe(first())
          .subscribe(
            (data) => {
              this.router.navigate(['/']);
              // this.router.navigate(['/']);
            },
            (error) => {
              this.error = error ? error : '';
            }
          );
      }
    }
  }
}
