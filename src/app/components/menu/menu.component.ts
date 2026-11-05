import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink, RouterLinkActive } from "@angular/router";

interface NavItem {
  label: string;
  path: string;
  icon: string;
  exact: boolean;
}

@Component({
  selector: "app-menu",
  imports: [RouterLink, RouterLinkActive, MatButtonModule, MatIconModule],
  templateUrl: "./menu.component.html",
  styleUrl: "./menu.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Menu {
  // One list drives both the top bar (wide screens) and the bottom bar (phones).
  protected readonly items: NavItem[] = [
    { label: "Home", path: "/", icon: "home", exact: true },
    { label: "Decks", path: "/decks", icon: "style", exact: false },
    { label: "Study", path: "/study", icon: "school", exact: false },
    { label: "Search", path: "/search", icon: "search", exact: false },
    { label: "Favourites", path: "/favourites", icon: "favorite", exact: false },
  ];
}
