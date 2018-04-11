export type EntryMode = "Add" | "Remove" | "Reset";

export interface Entry {
  id?: string;
  label?: string;
  value?: string;
  categoryId?: number;
  numericValue?: number;
}
