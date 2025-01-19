import { Store } from "../store/store"

export interface ExpenseReport {
    id: number
    url: string
    start: string
    end: string
    expense_by_store_report: ExpenseByStoreReport[]
}
  
  export interface ExpenseByStoreReport {
    id: number
    url: string
    report: number
    store: Store
    currency: string
    expense_amount: string
}
  