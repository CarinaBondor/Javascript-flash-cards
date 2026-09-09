import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, RouterLinkActive, MatToolbarModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class Menu {}
