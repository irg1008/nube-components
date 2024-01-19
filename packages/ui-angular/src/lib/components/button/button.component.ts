import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'lib-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  text = 'hola que pasda picha';
}
