import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  baseUrl = environment.url;
  constructor(private httpClient: HttpClient) { }
  /*********************************************************************************************************************************************/

  /****************************************************Get all user places by Id********************************************************************/
  getAllPlacesById(user_id):Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrl}get-all-places/${user_id}`);
  }

  /****************************************************Get all Users Details****************************************************************/

  getUsers():Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrl}get-users`);
  }

  /***************************************************Add new user places********************************************************************/

  addNewPlace(placesData):Observable<any>{
    return this.httpClient.post<any>(`${this.baseUrl}add-new-places`, placesData);
  }

  /**************************************************Update user places**********************************************************************/

  updatePlace(placesData, userId):Observable<any>{
    return this.httpClient.patch<any>(`${this.baseUrl}update-user-places/${userId}`, placesData);
  }

  /***************************************************User Active Deactive*************************************************************************/

  updateStatus(userId):Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrl}update-user-status/${userId}`)
  }

  /***************************************************Delete User********************************************************************/

  deleteUser(userId):Observable<any>{
    return this.httpClient.delete<any>(`${this.baseUrl}delete-user/${userId}`);
  }

  /**************************************************Add Place Image*****************************************************************************/

  addPlaceImage(formData):Observable<any>{
    return this.httpClient.post<any>(`${this.baseUrl}add-places-image`, formData);
  }
  /*********************************************************************************************************************************************/

}
