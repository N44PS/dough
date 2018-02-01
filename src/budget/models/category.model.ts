import { Entry } from "./entry.model";

export interface Category {
  id?: string;
  label?: string;
  isExpense?: boolean;
  items?: Entry[];
  total?: string;
}
