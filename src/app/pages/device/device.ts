import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-device',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatIconModule, HttpClientModule],
  templateUrl: './device.html',
  styleUrls: ['./device.css']
})
export class Device implements OnInit {
  private readonly API_URL = 'https://private-helpdesk-backend.onrender.com/devices';

  public displayedColumns: string[] = ['name', 'deviceNumber', 'snid', 'model', 'chargerNumber', 'status', 'actions'];
  public dataSource: any[] = [];
  public filteredData: any[] = [];
  public availableCount = 0;
  public inUseCount = 0;
  public filterStatus: string = 'all';
  public sortAscending: boolean = true;
  public showModal = false;

  // Campos do novo dispositivo
  newDevice = {
    name: '',
    deviceNumber: '',
    snid: '',
    model: '',
    chargerNumber: '',
    status: 'DISPONIVEL'
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getDevices();
  }

  getDevices() {
    this.http.get<any[]>(this.API_URL).subscribe({
      next: (devices) => {
        this.dataSource = devices;
        this.updateStatusCounts();
        this.applyFilters();
      },
      error: (err) => console.error('Erro ao buscar dispositivos:', err)
    });
  }

  updateStatusCounts() {
    this.availableCount = this.dataSource.filter(d => d.status === 'DISPONIVEL').length;
    this.inUseCount = this.dataSource.filter(d => d.status === 'EM_USO').length;
  }

  applyFilters() {
    let filtered = [...this.dataSource];
    if (this.filterStatus !== 'all') {
      filtered = filtered.filter(d => d.status === this.filterStatus);
    }
    filtered.sort((a, b) =>
      this.sortAscending ? a.deviceNumber - b.deviceNumber : b.deviceNumber - a.deviceNumber
    );
    this.filteredData = filtered;
  }

  toggleSort() {
    this.sortAscending = !this.sortAscending;
    this.applyFilters();
  }

  editDevice(device: any) {
    Swal.fire('Editar', `Editar dispositivo ${device.deviceNumber}`, 'info');
  }

  deleteDevice(device: any) {
    Swal.fire({
      title: 'Tem certeza?',
      text: `Deseja excluir o dispositivo ${device.deviceNumber}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`${this.API_URL}/${device.id}`).subscribe({
          next: () => {
            Swal.fire('Excluído!', 'O dispositivo foi removido.', 'success');
            this.getDevices();
          },
          error: () => Swal.fire('Erro', 'Não foi possível excluir o dispositivo.', 'error')
        });
      }
    });
  }

  // 🔹 Modal
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.newDevice = { name: '', deviceNumber: '', snid: '', model: '', chargerNumber: '', status: 'DISPONIVEL' };
  }

  saveDevice() {
    this.http.post(this.API_URL, this.newDevice).subscribe({
      next: () => {
        Swal.fire('Sucesso', 'Dispositivo adicionado com sucesso!', 'success');
        this.closeModal();
        this.getDevices();
      },
      error: () => Swal.fire('Erro', 'Falha ao adicionar dispositivo.', 'error')
    });
  }
}
