import { Currency } from "../currency/currency"
import { Staff } from "./staff"

export interface StaffPayment {
    id: number
    url: string
    payment_group: StaffPaymentGroup
    staff: Staff
    pay_status: string
    currency: Currency
    amount: string
    overtime: string
    extra: string
}
  
export interface StaffPaymentGroup {
    id: number
    url: string
    created_date: string
}
  