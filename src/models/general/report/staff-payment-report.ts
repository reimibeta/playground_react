import { Store } from "../store/store"

export interface StaffPaymentReport {
    id: number
    url: string
    start: string
    end: string
    staff_payment_by_store_report: StaffPaymentByStoreReport[]
}
  
export interface StaffPaymentByStoreReport {
    id: number
    url: string
    report: number
    store: Store
    currency: string
    normal_pay: string
    overtime_pay: string
    extra_pay: string
    total_pay: string
}
  