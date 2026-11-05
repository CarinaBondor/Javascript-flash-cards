import { ChangeDetectionStrategy, Component, computed, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { ThemeService } from "../../services/themeService/theme.service";
import { ThemeMode } from "../../models/theme.model";
import { MatMenuModule } from "@angular/material/menu";

interface ThemeOption {
  mode: ThemeMode;
  label: string;
  icon: string;
}

interface NavItem {
  label: string;
  path: string;
  icon: string;
  exact: boolean;
}

@Component({
  selector: "app-menu",
  imports: [RouterLink, RouterLinkActive, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: "./menu.component.html",
  styleUrl: "./menu.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Menu {
  protected readonly theme = inject(ThemeService);

  protected readonly themeOptions: ThemeOption[] = [
    { mode: "system", label: "Match my device", icon: "brightness_auto" },
    { mode: "light", label: "Light", icon: "light_mode" },
    { mode: "dark", label: "Dark", icon: "dark_mode" },
  ];

  // Recalculated only when theme.mode() changes.
  protected readonly currentTheme = computed(
    () => this.themeOptions.find((option) => option.mode === this.theme.mode())!,
  );
  // One list drives both the top bar (wide screens) and the bottom bar (phones).
  protected readonly items: NavItem[] = [
    { label: "Home", path: "/", icon: "home", exact: true },
    { label: "Decks", path: "/decks", icon: "style", exact: false },
    { label: "Study", path: "/study", icon: "school", exact: false },
    { label: "Search", path: "/search", icon: "search", exact: false },
    { label: "Favourites", path: "/favourites", icon: "favorite", exact: false },
  ];
}
