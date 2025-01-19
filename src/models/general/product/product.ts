import { Currency } from "../currency/currency"
import { Type } from "./type"
import { Brand } from "./brand"
import { Store } from "../store/store"
import { Category, Subcategory } from "./category"

export interface Product {
    id: number
    url: string
    name: string
    created_date: string
    is_on_sale: boolean
    is_available: boolean
    product_image: ProductImage[]
    product_type: ProductType
    product_brand: ProductBrand
    product_category: ProductCategory
    product_store: ProductStore
    product_quantity: ProductQuantity
    product_price: ProductPrice
    product_attribute: any[]
    product_sku: any
    product_description: any
}

export interface ProductQuantity {
    id: number
    quantity: number
}
  
export interface ProductImage {
    id: number
    url: string
    image: string
    thumbnail: string
}
  
export interface ProductType {
    id: number
    url: string
    type: Type
}
  
export interface ProductBrand {
    id: number
    url: string
    brand: Brand
}
  

  
export interface ProductCategory {
    id: number
    url: string
    category: Category
    subcategory: Subcategory
}
  

  
export interface ProductStore {
    id: number
    url: string
    store: Store
}
  
export interface ProductPrice {
    id: number
    url: string
    currency: Currency
    cost_principle: string
    cost_of_sale: string
}
  
// statistic
export interface ProductStatistic {
    title: string
    data: ProductStatisticData
    extra: any
}

export interface ProductStatisticData {
    labels: string[]
    datasets: ProductStatisticDataset[]
}

export interface ProductStatisticDataset {
    label: string
    backgroundColor: string
    borderColor: string
    data: []
}