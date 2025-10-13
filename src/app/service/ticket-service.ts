// ticket.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TicketInterface } from '../interface/ticket-interface';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
    // Definindo a URL base como uma constante para facilitar a manutenção
    private readonly API = 'http://localhost:8080/tickets';

    constructor (private http: HttpClient) {}

    GetTickets(): Observable<TicketInterface[]> {
      // Método GET existente
      return this.http.get<TicketInterface[]>(this.API);
    }

    
  
    
 
    // ⭐ NOVO MÉTODO DE EXCLUSÃO (DELETE) ⭐
    // Ele receberá o ID do ticket que você deseja excluir
    DeleteTicket(id: number): Observable<void> {
      // Constrói a URL para a exclusão. Exemplo: https://.../tickets/5
      const url = `${this.API}/${id}`;
      
      // Usa o método .delete() do HttpClient
      // O tipo de retorno é geralmente 'void' ou 'any', pois o backend deve retornar 204 No Content
      return this.http.delete<void>(url);
    }
}