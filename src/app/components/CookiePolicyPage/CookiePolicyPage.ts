import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-cookie-policy-page',
  imports: [MatCardModule, MatDividerModule],
  templateUrl: './CookiePolicyPage.html',
  styleUrl: './CookiePolicyPage.scss',
})
export class CookiePolicyPage {}
