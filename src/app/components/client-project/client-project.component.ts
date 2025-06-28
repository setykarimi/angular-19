import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Client } from '../../model/class/Client';
import {
  APIResponseModel,
  ClientProject,
  Employee,
} from '../../model/interface/role';
import { ClientService } from '../../services/client.service';
import { DatePipe } from '@angular/common';
import { AlertComponent } from "../../reusableComponent/alert/alert.component";

@Component({
  selector: 'app-client-project',
  imports: [ReactiveFormsModule, DatePipe, AlertComponent],
  templateUrl: './client-project.component.html',
  styleUrl: './client-project.component.css',
})

export class ClientProjectComponent implements OnInit {

  projectForm: FormGroup = new FormGroup({
    clientProjectId: new FormControl(0),
    prjectName: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    startDate: new FormControl(''),
    expectedEndData: new FormControl(''),
    leadByEmpId: new FormControl(''),
    completedDate: new FormControl(''),
    contactPerson: new FormControl(''),
    contactPersonContactNo: new FormControl(''),
    totalEmpWorking: new FormControl(''),
    projectCost: new FormControl(''),
    projectDetails: new FormControl(''),
    contactPersonEmailId: new FormControl(''),
    clientId: new FormControl(''),
  });

  clientSrv = inject(ClientService);
  employeeList: Employee[] = [];
  clientList: Client[] = [];

  firstName = signal('Angular 18');
  projectList = signal<ClientProject[]>([]);

  

  ngOnInit(): void {
    const name = this.firstName();
    this.getAllClients();
    this.getAllEmployee();
    this.getAllClientProjects();
  }

  changeFName() {
    this.firstName.set('ReactJs');
  }

  getAllEmployee() {
    this.clientSrv.getAllEmployee().subscribe((res: APIResponseModel) => {
      this.employeeList = res.data;
    });
  }

  getAllClientProjects() {
    this.clientSrv.getAllClientProjects().subscribe((res: APIResponseModel) => {
      this.projectList.set(res.data);
    });
  }

  getAllClients() {
    this.clientSrv.getAllClients().subscribe((res: APIResponseModel) => {
      this.clientList = res.data;
    });
  }

  onSaveProject() {
    const formValue = this.projectForm.value;
    this.clientSrv
      .addClientProjectUpdate(formValue)
      .subscribe((res: APIResponseModel) => {
        if (res.result) {
          alert('Project Created');
        } else {
          alert(res.message);
        }
      });
  }
}
