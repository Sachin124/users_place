import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.url;
  public isLoggedIn:boolean = false;
  redirectUrl: string;

  constructor(private httpClient: HttpClient, private cookieService: CookieService, private router: Router) { }
  /***************************************************************************************************************************************/


  // getUsersPlace():Observable<any>{
  //   return this.httpClient.get<any>(`${this.baseUrl}get-user-place `)
  // }

  /**********************************************Add New User Account*************************************************************/

  addNewUser(userData):Observable<any>{
    return this.httpClient.post<any>(`${this.baseUrl}add-new-user `, userData)
  }

  /************************************************Login New User**********************************************************************/


  login(model): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}auth-login`, model).pipe(
      delay(1000),
      tap(val => this.isLoggedIn = true)
    );
  }

  /****************************************************Logout and clear catche and token*********************************************************************/

  logout() {
    // remove user from local storage to log user out
    this.router.navigate(["/user/login"]);
    this.cookieService.delete('currentUser');
    localStorage.removeItem('currentUser');

  }

  /****************************************************Go to Home********************************************************/

  goHome() {
    this.router.navigate(["/users/places"]);
  }

  /***************************************************************************************************************************************/

}
