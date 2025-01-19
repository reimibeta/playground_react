import { Currency } from "../currency/currency"
import { Product } from "../product/product"
import { Store } from "../store/store"
import { Supplier } from "../supplier/supplier"

export interface Supply {
    id: number
    url: string
    note: string
    request_date: string
    require_date: string
    supply_date: string
    identifier: string
    status: string
    supply_store: SupplyStore
    supply_product: SupplyProduct[]
    supply_payment: SupplyPayment
    supply_delivery: SupplyDelivery[]
  }
  
  export interface SupplyStore {
    id: number
    url: string
    supply: number
    store: Store
  }
  
  export interface SupplyProduct {
    id: number
    url: string
    supply: number
    supplier: Supplier
    status: string
    product: Product
    quantity: number
    currency: Currency
    cost: string
    is_paid: boolean
    note: string
  }
  
  // export interface Supplier {
  //   id: number
  //   url: string
  //   name: string
  //   created_date: string
  //   updated_date: any
  //   is_active: boolean
  // }
  
  // export interface Product {
  //   id: number
  //   url: string
  //   name: string
  //   created_date: string
  //   is_on_sale: boolean
  //   is_available: boolean
  //   product_image: ProductImage[]
  //   product_type: ProductType
  //   product_brand: ProductBrand
  //   product_category: ProductCategory
  //   product_store: ProductStore
  //   product_quantity: ProductQuantity
  //   product_price: ProductPrice
  //   product_attribute: any[]
  //   product_sku: any
  //   product_description: any
  // }
  
  // export interface ProductImage {
  //   id: number
  //   url: string
  //   image: string
  //   thumbnail: string
  // }
  
  // export interface ProductType {
  //   id: number
  //   url: string
  //   type: Type
  // }
  
  // export interface Type {
  //   id: number
  //   url: string
  //   name: string
  //   description: string
  // }
  
  // export interface ProductBrand {
  //   id: number
  //   url: string
  //   brand: Brand
  // }
  
  // export interface Brand {
  //   id: number
  //   url: string
  //   name: string
  //   image: any
  //   description: string
  //   is_available: boolean
  // }
  
  // export interface ProductCategory {
  //   id: number
  //   url: string
  //   category: Category
  //   subcategory: Subcategory
  // }
  
  // export interface Category {
  //   id: number
  //   url: string
  //   name: string
  //   image: any
  //   description: string
  //   subcategory: number[]
  // }
  
  // export interface Subcategory {
  //   id: number
  //   category: number
  //   name: string
  //   description: string
  // }
  
  // export interface ProductStore {
  //   id: number
  //   url: string
  //   store: Store
  // }
  
  // export interface ProductQuantity {
  //   id: number
  //   url: string
  //   quantity: number
  // }
  
  // export interface ProductPrice {
  //   id: number
  //   url: string
  //   currency: number
  //   cost_principle: string
  //   cost_of_sale: string
  // }
  
  // export interface Currency {
  //   id: number
  //   url: string
  //   currency: string
  //   name: string
  //   symbol: string
  //   rate: string
  // }
  
  export interface SupplyPayment {
    id: number
    url: string
    supply: number
    payment_date: string
    payment_status: string
  }
  
  export interface SupplyDelivery {
    id: number
    url: string
    supply: number
    note: string
    deliver: Deliver
    currency: Currency
    cost_delivery: string
    delivery_date: string
    arrived_date: string
    payment_status: string
    delivery_status: string
  }
  
  export interface Deliver {
    id: number
    url: string
    user: number
    display_name: string
    role: Role
    is_active: boolean
    staff_store?: number
    staff_phone: any[]
    staff_address: any
  }
  
  export interface Role {
    role: string
  }
  