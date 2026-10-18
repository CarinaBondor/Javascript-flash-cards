import { Component } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";

@Component({
  selector: "app-privacy-policy-page",
  imports: [MatCardModule, MatDividerModule],
  templateUrl: "./PrivacyPolicyPage.html",
  styleUrl: "./PrivacyPolicyPage.scss",
})
export class PrivacyPolicyPage {}
