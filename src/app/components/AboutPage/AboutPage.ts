import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-about-page',
  imports: [MatListModule, MatCardModule],
  templateUrl: './AboutPage.html',
  styleUrl: './AboutPage.scss',
})
export class AboutPage {}
