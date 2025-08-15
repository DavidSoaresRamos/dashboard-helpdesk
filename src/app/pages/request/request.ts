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
  public displayedColumns: string[] = ['name', 'sector', 'problem', 'id'];
  public dataSource: any = [];
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.getMethod();
  }
  public getMethod() {
    ticket: this.getTicketValue;
    this.http.get('helpdesk-backend-production-372a.up.railway.app').subscribe((ticket) => {
      console.log(ticket);
      this.getTicketValue = ticket;
      this.dataSource = ticket;
    });
  }
}
