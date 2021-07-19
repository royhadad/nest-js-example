import {Injectable, NotFoundException} from "@nestjs/common";
import {Product, ProductId, ProductMutableProperties} from "./product.model";

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    insertProduct(title: string, description: string, price: number): ProductId {
        const productId = new Date().getTime().toString();
        const product = new Product(productId, title, description, price)
        this.products.push(product);
        return productId;
    }

    getProducts(): Product[] {
        return [...this.products];
    }

    getProductById(id: ProductId): Product {
        const productIndex = this.findProductIndex(id);
        return {...this.products[productIndex]};
    }

    updateProduct(productId: ProductId, propertiesToUpdate: Partial<ProductMutableProperties>): Product {
        const productIndex = this.findProductIndex(productId);
        this.products[productIndex] = {...this.products[productIndex], ...propertiesToUpdate}
        return this.products[productIndex];
    }

    deleteProduct(productId:ProductId):Product{
        const productIndex = this.findProductIndex(productId);
        const product = this.products[productIndex];
        this.products.splice(productIndex, 1);
        return product;
    }

    private findProductIndex(id: ProductId): number {
        const productIndex = this.products.findIndex((product) => (product.id === id));
        if (productIndex === undefined) {
            throw new NotFoundException();
        } else {
            return productIndex;
        }
    }
}