import { Entry } from "./entry.model";

export interface Category {
  id?: string;
  label?: string;
  isExpenses?: boolean;
  entries?: Entry[];
  total?: string;
}
