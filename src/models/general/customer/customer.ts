export interface Customer {
    id: number
    url: string
    name: string
    priority: string
    created_date: string
    status: boolean
    customer_phone: CustomerPhone[]
    customer_address: any
}
  
export interface CustomerPhone {
    id: number
    url: string
    customer: number
    phone: string
}
  