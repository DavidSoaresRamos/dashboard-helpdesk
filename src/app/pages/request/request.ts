import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';


@Component({
  selector: 'app-request',
  standalone: true,
  imports: [MatSelectModule, DatePipe, MatTableModule, HttpClientModule],
  templateUrl: './request.html',
  styleUrl: './request.css'
}) 
export class Request implements OnInit {

  public getTicketValue: any;
  public displayedColumns: string[] = ['name', 'sector', 'problem', 'status','created', 'id', 'actions'];
  public dataSource: any = [];
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.getMethod();
  }
  public getMethod() {
    ticket: this.getTicketValue;
    this.http.get('https://private-helpdesk-backend.onrender.com/tickets').subscribe((ticket) => {
      console.log(ticket);
      this.getTicketValue = ticket;
      this.dataSource = ticket;
    });
  }
}
