import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Client } from '../model/class/Client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}

  getAllClients(): Observable<Client> {
    return this.http.get<Client>(environment.API_URL + 'GetAllClients');
  }

  addUpdate(obj: Client): Observable<Client> {
    return this.http.post<Client>(environment.API_URL + 'AddUpdateClient', obj);
  }

  deleteClientByID(id: string): Observable<Client> {
    return this.http.get<Client>(
      environment.API_URL + 'DeleteClientByClientId?clientId=' + id
    );
  }
}
