import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'favourite-button',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './favouriteButton.html',
})
export class FavouriteButton {
  isFavourite = false;
}
