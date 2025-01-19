import { Store } from "../store/store"

export interface SupplyReport {
    id: number
    url: string
    start: string
    end: string
    supply_by_store_report: SupplyByStoreReport[]
}
  
export interface SupplyByStoreReport {
    id: number
    url: string
    report: number
    store: Store
    currency: string
    supply_amount: string
    supply_delivery_amount: string
    supply_total_amount: string
}
  