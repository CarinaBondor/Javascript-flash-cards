import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-footer',
  imports: [MatButtonModule, MatToolbarModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {}
