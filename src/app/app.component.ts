import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-3';
  selectedPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';
  selectedBgColor: string = '#03045e';
  selectedFontColor: string = '#caf0f8';
  selectedFontSize: string = '16px';
}
