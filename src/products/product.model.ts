export class Product {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public price: number
    ) {
    }
}

export type ProductMutableProperties = Pick<Product, 'title' | 'description' | 'price'>
export type ProductId = Product['id'];