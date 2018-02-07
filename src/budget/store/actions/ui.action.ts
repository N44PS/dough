import { Action } from "@ngrx/store";
import { EntryMode } from "../../models/entry.model";

export const TOGGLE_STATE = "[Dough] Toggle Modal State";
export const SET_ENTRY_MODE = "[Dough] Set Entry Mode";

export class toggleModalState implements Action {
    readonly type = TOGGLE_STATE;
}

export class setEntryMode implements Action {
    readonly type = SET_ENTRY_MODE;
    constructor(public payload: EntryMode) { }
}

// action types
export type UIAction = toggleModalState | setEntryMode;
