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

  getAllPlacesById(user_id):Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrl}get-all-places/${user_id}`);
  }

  getUsers():Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrl}get-users`);
  }

  addNewPlace(placesData):Observable<any>{
    return this.httpClient.post<any>(`${this.baseUrl}add-new-places`, placesData);
  }

  updatePlace(placesData, userId):Observable<any>{
    return this.httpClient.patch<any>(`${this.baseUrl}update-user-places/${userId}`, placesData);
  }

  updateStatus(userId):Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrl}update-user-status/${userId}`)
  }


  deleteUser(userId):Observable<any>{
    return this.httpClient.delete<any>(`${this.baseUrl}delete-user/${userId}`);
  }

  getPlaceById(){

  }

  addPlaceImage(formData):Observable<any>{
    return this.httpClient.post<any>(`${this.baseUrl}add-places-image`, formData);
  }

}
