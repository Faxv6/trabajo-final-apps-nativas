export interface Products {
    id: number,
    userId: string | number,
    categoryId: number,
    categoryName: string,
    name: any,
    description: string,
    price: number,
    featured: boolean,
    labels: [],
    recommendedFor: number,
    discount: number,
    hasHappyHour: boolean
}

export interface NewProduct {
    name: string,
    description: string,
    price: number,
    categoryId: number,
    featured: boolean,
    labels: [],
    recommendedFor: number,
    discount: number,
    hasHappyHour: boolean
}
