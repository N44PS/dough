import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import * as fromStore from "../../store";
import { Category } from "../../models/category.model";
import { Month } from "../../models/month.model";

@Component({
  selector: "budget",
  styleUrls: ["budget.component.scss"],
  templateUrl: "./budget.component.html"
})
export class BudgetComponent implements OnInit {
  categories$: Observable<Category[]>;
  months$: Observable<Month[]>;
  currentMonth$: Observable<Month>;

  constructor(private store: Store<fromStore.BudgetState>) {}

  ngOnInit() {
    this.categories$ = this.store.select(fromStore.getAllCategories);
    this.months$ = this.store.select(fromStore.getAllMonths);
    this.currentMonth$ = this.store.select(fromStore.getCurrentMonth);
    this.store.dispatch(new fromStore.LoadMonths());
  }
}
