import {
  Component,
  Input,
  ChangeDetectionStrategy,
  HostListener
} from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromStore from "../../store";

import { Entry } from "../../models/entry.model";

@Component({
  selector: "entry",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["entry.component.scss"],
  templateUrl: "./entry.component.html"
})
export class EntryComponent {
  @Input() entry: Entry;
  @Input() categoryId: number;
  @Input() isExpense: boolean = true;

  constructor(private store: Store<fromStore.BudgetState>) {}

  @HostListener("click", ["$event"])
  onClick(e) {
    this.store.dispatch(
      new fromStore.SetCurrentEntry({
        ...this.entry,
        categoryId: this.categoryId
      })
    );
    this.store.dispatch(new fromStore.toggleModalState());
  }
}
