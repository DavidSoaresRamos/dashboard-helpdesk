import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 



@Component({
  selector: 'app-chips',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatIconModule, 
    HttpClientModule,
  ], 
  templateUrl: './chips.html',
  styleUrl: './chips.css'
})

export class Chips implements OnInit {
private readonly API_URL = 'https://private-helpdesk-backend.onrender.com/SIMCard';
  public displayedColumns: string[] = ['name', 'ddd', 'number', 'observation'];
  public dataSource: any[] = [];
  public getChipsValue: any;
  constructor(private http: HttpClient) {}

 ngOnInit(): void {
    this.getMethod();
  }

  public getMethod() {
    this.http.get<any[]>(this.API_URL).subscribe({
      next: (chips) => {
        this.getChipsValue = chips;
        this.dataSource = chips;
      },
      error: (err) => console.error('Erro ao buscar Cartões SIM:', err)
    });
  }
}
