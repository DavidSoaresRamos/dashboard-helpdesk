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
  data = [
    { name: 'David', sector: 'TI', problem: 'Sem internet', id: 1 },
    { name: 'David', sector: 'TI', problem: 'PC sem funcionar', id: 2 }
  ];

  ngOnInit() {

  }
}
