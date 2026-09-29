import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-about-page',
  imports: [MatListModule, MatCardModule, MatIconModule, MatChipsModule, MatDividerModule],
  templateUrl: './AboutPage.html',
  styleUrl: './AboutPage.scss',
})
export class AboutPage {}
