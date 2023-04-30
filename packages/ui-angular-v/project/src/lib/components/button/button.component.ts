import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'ui-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  text = 'hola';
}
