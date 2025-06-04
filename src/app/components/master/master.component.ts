import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DesignationComponent } from '../designation/designation.component';
import { RolesComponent } from '../roles/roles.component';

@Component({
  selector: 'app-master',
  imports: [CommonModule, RolesComponent, DesignationComponent],
  templateUrl: './master.component.html',
  styleUrl: './master.component.css',
})
export class MasterComponent {
  currentComponent = 'Roles';
  changeTab(tab: string) {
    this.currentComponent = tab;
  }
}
