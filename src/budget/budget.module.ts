import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { InlineSVGModule } from "ng-inline-svg";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { reducers, effects } from "./store";

// components
import * as fromComponents from "./components";

// containers
import * as fromContainers from "./containers";

// services
import * as fromServices from "./services";

// routes
export const ROUTES: Routes = [
  {
    path: "",
    component: fromContainers.BudgetComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature("budget", reducers),
    EffectsModule.forFeature(effects),
    InlineSVGModule
  ],
  providers: [...fromServices.services],
  declarations: [...fromContainers.containers, ...fromComponents.components],
  exports: [...fromContainers.containers, ...fromComponents.components]
})
export class BudgetModule {}
