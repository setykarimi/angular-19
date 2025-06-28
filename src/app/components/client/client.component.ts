import { AsyncPipe, DatePipe, JsonPipe, UpperCasePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Client } from '../../model/class/Client';
import { APIResponseModel } from '../../model/interface/role';
import { ClientService } from '../../services/client.service';
import { MyButtonComponent } from "../../reusableComponent/my-button/my-button.component";

@Component({
  selector: 'app-client',
  imports: [FormsModule, UpperCasePipe, DatePipe, JsonPipe, AsyncPipe, MyButtonComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
})
export class ClientComponent implements OnInit {
  currentDate: Date = new Date();

  clientObj: Client = new Client();
  clientList: Client[] = [];

  clientService = inject(ClientService);
  userList$: Observable<any> = new Observable<any>();

  ngOnInit(): void {
    this.loadClient();
    this.userList$ = this.clientService.getAllUser();
  }

  loadClient() {
    this.clientService.getAllClients().subscribe((res: APIResponseModel) => {
      this.clientList = res.data;
    });
  }

  onSaveClient(data:string) {
    this.clientService
      .addUpdate(this.clientObj)
      .subscribe((res: APIResponseModel) => {
        if (res.result) {
          alert('Client Created Success');
          this.loadClient();
          this.clientObj = new Client();
        } else {
          alert(res.message);
        }
      });
  }

  onDelete(id: number) {
    const isDelete = confirm('Are you sure want to delete?');
    if (isDelete == true) {
      this.clientService
        .deleteClientByID(id)
        .subscribe((res: APIResponseModel) => {
          if (res.result) {
            alert('Client deleted successfully');
            this.loadClient();
            this.clientObj = new Client();
          } else {
            alert(res.message);
          }
        });
    }
  }

  onEdit(client: Client) {
    this.clientObj = client;
  }
}
