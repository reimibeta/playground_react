import { Store } from "../store/store"

export interface DeliverySpendingReport {
    id: number
    url: string
    start: string
    end: string
    delivery_spending_by_store_report: DeliverySpendingByStoreReport[]
}
  
  export interface DeliverySpendingByStoreReport {
    id: number
    url: string
    report: number
    store: Store
    currency: string
    supply_delivery_amount: string
    order_delivery_amount: string
}
  