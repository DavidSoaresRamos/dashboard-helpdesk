import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-request',
  imports: [MatTableModule],
  templateUrl: './request.html',
  styleUrl: './request.css'
})
export class Request implements OnInit { 
  dataSource = [
    { name: 'John Doe', sector: 'IT', problem: 'Login Issue', id: 1 },
    { name: 'Jane Smith', sector: 'HR', problem: 'Payroll', id: 2 }
  ];

  ngOnInit() {

  }
}
