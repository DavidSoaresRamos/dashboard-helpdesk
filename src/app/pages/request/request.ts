import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-request',
  standalone: true,
  imports: [MatTableModule, HttpClientModule],
  templateUrl: './request.html',
  styleUrl: './request.css'
}) 
export class Request implements OnInit {

  public getTicketValue: any;
  public displayedColumns: string[] = ['name', 'sector', 'problem', 'status','created', 'id'];
  public dataSource: any = [];
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.getMethod();
  }
  public getMethod() {
    ticket: this.getTicketValue;
    this.http.get('http://localhost:8080/tickets').subscribe((ticket) => {
      console.log(ticket);
      this.getTicketValue = ticket;
      this.dataSource = ticket;
    });
  }
}
