import { Currency } from "../currency/currency"
import { Customer } from "../customer/customer"
import { Product } from "../product/product"
import { Store } from "../store/store"
import { Supplier } from "../supplier/supplier"
import { Manager } from "./manger"
import { Seller } from "./seller"

export interface Order {
    id: number
    url: string
    receipt: string
    ordered_date: string
    required_date: string
    received_date: any
    order_type: string
    order_status: string
    order_note: OrderNote
    order_store: OrderStore
    order_seller: OrderSeller
    order_customer: OrderCustomer
    order_product: OrderProduct[]
    order_service: any[]
    order_payment: OrderPayment
    order_address: any
    order_delivery: OrderDelivery[]
    order_profit: number
  }

  export interface PaymentType {
    identifier: string
    label: string
  }

  export interface OrderPayment {
    id: number
    url: string
    order: number
    payment_status: string
    payment_type: PaymentType
    payment_date: string
  }
  
  export interface OrderNote {
    id: number
    url: string
    order: number
    note: string
  }
  
  export interface OrderStore {
    id: number
    url: string
    order: number
    store: Store
  
  }
  
  export interface OrderSeller {
    id: number
    url: string
    order: number
    seller: Seller
  }
  
  export interface OrderCustomer {
    id: number
    url: string
    order: number
    customer: Customer
  }
  
  export interface OrderProduct {
    id: number
    url: string
    order: number
    product: Product
    supplier: Supplier
    type: string
    status: string
    quantity: number
    currency: Currency
    unit_price: string
    is_take_out: boolean
    is_paid: boolean
    discount: string
    booking_fee: string
    unit_tip: string
    note: string
  }
  
export interface OrderPayment {
    id: number
    url: string
    order: number
    payment_status: string
    payment_type: PaymentType
    payment_date: string
}
  
export interface PaymentType {
    identifier: string
    label: string
}

export interface OrderDelivery {
    id: number
    url: string
    order: number
    deliver: Deliver
    quantity: number
    currency: Currency
    addition_cost: string
    cost: string
    delivery_date: string
    arrived_date: string
    payment_status: string
    delivery_status: string
}

export interface Deliver {
    id: number
    url: string
    user: number
    name: string
    role: number
    is_active: boolean
    staff_store: any
    staff_phone: any[]
    staff_address: any
}
  
  