import { ChangeDetectionStrategy, Component, computed, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { CardRow } from "../../components/appCardRow/appCardRow.component";
import { CardsService } from "../../services/cards.service";
import { SearchService } from "../../services/search.service";

@Component({
  selector: "app-search-page",
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, CardRow],
  templateUrl: "./search-page.html",
  styleUrl: "./search-page.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPage {
  private readonly searchService = inject(SearchService);

  readonly cardCount = inject(CardsService).getAll().length;

  // Signals tell zoneless Angular when to re-render, however the query gets updated.
  readonly searchQuery = signal("");
  readonly hasQuery = computed(() => this.searchQuery().trim().length > 0);
  readonly results = computed(() => this.searchService.search(this.searchQuery()));
}
