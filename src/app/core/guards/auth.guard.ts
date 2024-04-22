import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../services/authfirebase.service';
import { AuthService } from '../services/auth.service';

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthGuard  {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private authFackservice: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log(environment.defaultauth)

        // if (environment.defaultauth === 'firebase') {
        //     const currentUser = this.authenticationService.currentUser();
        //     if (currentUser && currentUser.profile) {
        //         // logged in so return true
        //         return true;
        //     }
        // } else {
            const currentUser = this.authFackservice.currentUserValue;
            console.log(currentUser)
            if (currentUser && currentUser.profile) {
                // logged in so return true
                return true;
       
       //     }
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
