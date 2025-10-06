import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-device',
  imports: [MatTableModule],
  templateUrl: './device.html',
  styleUrl: './device.css'
})
export class Device {
 public displayedColumns: string[] = ['name', 'number', 'snid', 'model','chargerNumber'];
}
