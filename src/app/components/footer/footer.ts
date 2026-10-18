import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-footer",
  imports: [MatButtonModule, MatToolbarModule, RouterLink],
  templateUrl: "./footer.html",
  styleUrl: "./footer.scss",
})
export class Footer {}
