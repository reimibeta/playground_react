
export interface RequestInterface<T> {
    refresh?: boolean,
    token?: string,
    loading?: boolean,
    onStart?: () => void,
    onResponse?: (data: T) => void,
    onFinish?: () => void,
    onError?: (error?: any) => void,
    onRefresh?: () => void,
}

export interface RequestListInterface<T> extends RequestInterface<T> {
    page?: number,
    filter?: string,
    loadmore?: boolean,
    search?: string,
    count?: number
}
