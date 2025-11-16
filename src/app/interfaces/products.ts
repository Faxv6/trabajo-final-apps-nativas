export interface Products {
    id: number,
    userId: string | number,
    categoryId: number,
    categoryName: string,
    name: string,
    description: string,
    price: number,
    featured: boolean,
    labels: [],
    recommendedFor: number,
    discount: number,
    hasHappyHour: boolean
}
