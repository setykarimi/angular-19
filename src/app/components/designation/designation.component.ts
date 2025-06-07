import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { APIResponseModel } from '../../model/interface/role';

@Component({
  selector: 'app-designation',
  imports: [],
  templateUrl: './designation.component.html',
  styleUrl: './designation.component.css',
})
export class DesignationComponent implements OnInit{
  masterService = inject(MasterService);
  ngOnInit(): void {
this.masterService.getDesignations().subscribe((result:APIResponseModel)=>{
  
})    
  }


}
