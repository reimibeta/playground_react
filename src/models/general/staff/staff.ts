export interface Staff {
    id: number
    url: string
    name: string
    role: Role
    is_active: boolean
    staff_store: StaffStore
    staff_phone: StaffPhone[]
    staff_address: any
}

export interface Role {
    role: string
}

export interface StaffStore {
    id: number
    url: string
    store: Store
}

export interface Store {
    id: number
    url: string
    manager: number
    name: string
    is_active: boolean
    is_open: boolean
}

export interface StaffPhone {
    id: number
    url: string
    phone: string
}
  