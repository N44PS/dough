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
  status$: Observable<{
    totalIncome: number;
    totalExpenses: number;
    netIncome: number;
    balance: number;
  }>;
  categories$: Observable<Category[]>;
  months$: Observable<Month[]>;
  currentMonth$: Observable<Month>;
  isLoading: boolean;
  prevMonth: Month;
  nextMonth: Month;

  constructor(private store: Store<fromStore.BudgetState>) {}

  ngOnInit() {
    this.status$ = this.store.select(fromStore.getStatus);
    this.categories$ = this.store.select(fromStore.getAllCategories);
    this.months$ = this.store.select(fromStore.getAllMonths);
    this.currentMonth$ = this.store.select(fromStore.getCurrentMonth);
    this.store
      .select(fromStore.isCategoriesLoading)
      .subscribe(value => (this.isLoading = value));
    this.store
      .select(fromStore.getNextMonth)
      .subscribe(month => (this.nextMonth = month));
    this.store
      .select(fromStore.getPrevMonth)
      .subscribe(month => (this.prevMonth = month));
    this.store.dispatch(new fromStore.LoadMonths());
  }

  changeMonth(month: Month) {
    this.store.dispatch(new fromStore.SetCurrentMonth(month));
  }
}
