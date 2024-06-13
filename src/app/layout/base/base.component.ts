import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [RouterOutlet,  RouterLink, RouterLinkActive],
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss'
})
export default class BaseComponent {

}
