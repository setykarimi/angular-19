import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Client } from '../../model/class/Client';
import { APIResponseModel, Employee } from '../../model/interface/role';
import { ClientService } from '../../services/client.service';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-client-project',
  imports: [ReactiveFormsModule],
  templateUrl: './client-project.component.html',
  styleUrl: './client-project.component.css',
})
export class ClientProjectComponent implements OnInit {
  projectForm: FormGroup = new FormGroup({
    clientProjectId: new FormControl(0),
    prjectName: new FormControl('',[Validators.required, Validators.minLength(4)]),
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
  ngOnInit(): void {
    this.getAllClients();
    this.getAllEmployee();
  }

  getAllEmployee() {
    this.clientSrv.getAllEmployee().subscribe((res: APIResponseModel) => {
      this.employeeList = res.data;
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
