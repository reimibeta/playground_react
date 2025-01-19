export interface Category {
    id: number
    url: string
    name: string
    image: any
    description: string
    subcategory: number[]
}

export interface Subcategory {
    id: number
    category: number
    name: string
    description: string
}