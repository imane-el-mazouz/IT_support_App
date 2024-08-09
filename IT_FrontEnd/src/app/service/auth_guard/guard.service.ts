// import { Injectable } from '@angular/core';
// import {
//   CanActivate,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
//   Router,
//   MaybeAsync,
//   GuardResult
// } from '@angular/router';
// import {AuthService} from "../auth_service/auth-service.service";
// import {Observable} from "rxjs";
// import {Role} from "../../enums/role";
//
//
// @Injectable({
//   providedIn: 'root'
// })
// export class GuardService implements CanActivate{
//
//   constructor( private authService :AuthService) { }
//
//   canActivate(route: ActivatedRouteSnapshot,
//               state: RouterStateSnapshot):
//   Observable<boolean> | Promise <boolean> | boolean {
//     const expectedRole = route.data.expectedRole as Role;
//     const userRole = this.authService.getUserRole();
//
//     if (userRole && userRole === expectedRole) {
//       return true;
//     } else {
//       this.router.navigate(['You don\'t have permission to access this resource']);
//       return false;
//     }
//   }
// }
