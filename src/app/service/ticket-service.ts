import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TicketInterface } from '../interface/ticket-interface';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
   constructor (private http: HttpClient) {}

   GetTickets():Observable<TicketInterface[]>{
    return this.http.get<TicketInterface[]>('http://localhost:8080/tickets')
   }
}
