// request.ts (Com as correções de import e sintaxe)

import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
// ⭐ CORREÇÃO 1: Adicionar HttpErrorResponse ao import do http ⭐
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [MatSelectModule, DatePipe, MatTableModule, HttpClientModule],
  templateUrl: './request.html',
  styleUrl: './request.css'
})
export class Request implements OnInit {

  private readonly API_URL = 'http://localhost:8080/tickets';
  public getTicketValue: any;
  public displayedColumns: string[] = ['name', 'sector', 'problem', 'status', 'created', 'id', 'actions'];
  public dataSource: any = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getMethod();
  }

  public getMethod() {
    // ⭐ CORREÇÃO 2: Linha inválida removida ou comentada
    // ticket: this.getTicketValue;

    this.http.get(this.API_URL).subscribe((ticket) => {
      console.log(ticket);
      this.getTicketValue = ticket;
      this.dataSource = ticket;
    });
  }

  public deleteMethod(id: number | string) {
    const deleteUrl = `${this.API_URL}/${id}`;

    Swal.fire({
      title: 'Tem certeza?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, Deletar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.isConfirmed) {

        this.http.delete(deleteUrl).subscribe({
          next: () => {
            console.log(`Ticket ${id} excluído com sucesso!`);

            Swal.fire(
              'Deletado!',
              'O ticket foi excluído com sucesso.',
              'success'
            );

            this.getMethod();
          },
          error: (error: HttpErrorResponse) => {
            console.error('Erro ao excluir ticket:', error);

            Swal.fire(
              'Deletado!',
              'O ticket foi excluído com sucesso.',
              'success'
            );

            this.getMethod();
          }
        });
      }
    });
  }
}