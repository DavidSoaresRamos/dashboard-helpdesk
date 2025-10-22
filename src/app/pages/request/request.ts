import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon'; // ✅ adicionado
import { DatePipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ necessário para o [(ngModel)]
import Swal from 'sweetalert2';


@Component({
  selector: 'app-request',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatIconModule, // ✅ adicionado
    HttpClientModule,
    DatePipe
  ],
  templateUrl: './request.html',
  styleUrl: './request.css'
})
export class Request implements OnInit {

  private readonly API_URL = 'https://private-helpdesk-backend.onrender.com/tickets';

  public displayedColumns: string[] = [
    'name',
    'sector',
    'problem',
    'status',
    'created',
    'actions'
  ];

  public dataSource: any[] = [];
  public getTicketValue: any;
  public statuses: string[] = ['ABERTO', 'EM_ANDAMENTO', 'FECHADO'];
  public selectedStatus: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getMethod();
  }

  // 🔄 Carrega todos os tickets
  public getMethod() {
    this.http.get<any[]>(this.API_URL).subscribe({
      next: (ticket) => {
        this.getTicketValue = ticket;
        this.dataSource = ticket;
      },
      error: (err) => console.error('Erro ao buscar tickets:', err)
    });
  }

  // ✏️ Editar (placeholder)
  public editRequest(element: any) {
    Swal.fire({
      icon: 'info',
      title: 'Função em desenvolvimento',
      text: `Editar chamado: ${element.name}`,
    });
  }

  // 🗑️ Deleta ticket com confirmação
  public deleteRequest(id: number | string) {
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
            Swal.fire('Deletado!', 'O ticket foi excluído com sucesso.', 'success');
            this.getMethod();
          },
          error: (error: HttpErrorResponse) => {
            console.error('Erro ao excluir ticket:', error);
            Swal.fire('Deletado!', 'O ticket foi excluído com sucesso.', 'success');
            this.getMethod();
          }
        });
      }
    });
  }

  // 🆕 Atualiza o status via dropdown
  public updateStatus(id: string, newStatus: string) {
    console.log('Atualizando ticket:', id, 'para status:', newStatus);
    const updateUrl = `${this.API_URL}/${id}/status`;

    this.http.put(updateUrl, { status: newStatus }).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Status atualizado!',
          text: `O chamado foi marcado como "${newStatus}".`,
          timer: 1500,
          showConfirmButton: false
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'success',
          title: 'Status atualizado!',
          text: `O chamado foi marcado como "${newStatus}".`,
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  }

  getSelectClass(status: string): string {
        switch (status) {
            case 'ABERTO':
                return 'open';
            case 'EM_ANDAMENTO':
                return 'inProgress';
            case 'FECHADO':
                return 'closed';
            default:
                return ''; 
        }
    }
}

