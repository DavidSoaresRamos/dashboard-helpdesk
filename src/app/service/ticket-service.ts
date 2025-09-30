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
    return this.http.get<TicketInterface[]>('https://api.render.com/deploy/srv-d3dug4qli9vc73d8r810?key=EV8V33vBD8k/tickets')
   }
}
