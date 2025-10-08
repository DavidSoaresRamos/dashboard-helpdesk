import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';


@Component({
  selector: 'app-root',
  imports: [HttpClientModule, RouterOutlet, CommonModule, RouterModule ,MatToolbarModule, MatSidenavModule, MatIconModule , MatListModule, MatButtonModule], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}