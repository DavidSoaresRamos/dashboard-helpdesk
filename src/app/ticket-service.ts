import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
   constructor( private httpclient: HttpClient) { }  
   httpOptions = { 
    headers: { 'Content-Type': 'application/json' }
   };
   getTickets() {
    return this.httpclient.get('http/')
}
}