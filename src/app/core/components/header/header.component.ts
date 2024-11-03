import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isCheked = false;

  onToggleChange() {
    this.isCheked ? document.body.classList.toggle('dark-mode-theme') : document.body.classList.toggle('dark-mode-theme');
  }
}
