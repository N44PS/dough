import { Action } from "@ngrx/store";

export const TOGGLE_STATE = "[Dough] Toggle Modal";

export class toggleModalState implements Action {
  readonly type = TOGGLE_STATE;
}
// action types
export type ModalAction = toggleModalState;
