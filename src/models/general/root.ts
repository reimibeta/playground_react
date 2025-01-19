export interface RootArray<T> {
    count: number;
    next?: any;
    previous?: any;
    results: T[];
    // add 
    page?: number,
    refresh?: boolean,
    loading?: boolean,
    loadmore?: boolean,
    filter?: string
}

export interface RootObject<T> {
    result: T
}