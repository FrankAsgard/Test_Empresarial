import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private dataUrl = 'assets/data/clients.json'; // Ruta al archivo de datos de los clientes

  constructor(private http: HttpClient) { }

  // Método para obtener los datos de los clientes desde un archivo JSON
  getClients(): Observable<any> {
    return this.http.get<any>(this.dataUrl);
  }
}
