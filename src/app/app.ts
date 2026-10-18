import { Component, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Menu } from "./components/menu/menu.component";
import { Footer } from "./components/footer/footer";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, Menu, Footer],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App {
  protected readonly title = signal("javascript-flash-cards");
}
