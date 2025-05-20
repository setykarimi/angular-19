import { Component } from '@angular/core';

@Component({
  selector: 'app-roles',
  imports: [],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css',
})


export class RolesComponent {
  firstName: string = 'Angular Tutorial';
  angularVersion = 'Version 19';

  version: number = 18;

  isActive: boolean = false;

  currentDate: Date = new Date();
}
