export interface UserPhoto {
    id: number;
    url: string;
    user: number;
    photo: string;
    thumbnail: string;
}

export interface User {
    id: number;
    url: string;
    email?: any;
    phone: number,
    name: string;
    first_name?: any;
    last_name?: any;
    user_photo?: UserPhoto;
    is_active: boolean;
    is_staff: boolean;
    is_customer: boolean;
    customer_id: number,
}

