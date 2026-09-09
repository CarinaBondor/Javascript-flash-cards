import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'favourite-button',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './favouriteButton.html',
  styleUrl: './favouriteButton.scss',
})
export class FavouriteButton {
  isFavourite = false;
}
