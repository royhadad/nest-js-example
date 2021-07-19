import {Injectable} from "@nestjs/common";
import {Product} from "./product.model";

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    insertProduct(title: string, description: string, price: number): Product['id'] {
        const productId = new Date().getTime().toString();
        const product = new Product(productId, title, description, price)
        this.products.push(product);
        return productId;
    }

    getProducts(): Product[] {
        return [...this.products];
    }

    getProductById(id: Product['id']): Product | undefined {
        return this.products.find((product) => (product.id === id));
    }
}