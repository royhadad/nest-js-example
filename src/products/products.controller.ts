import {Body, Controller, Get, NotFoundException, Post} from "@nestjs/common";
import {ProductsService} from "./products.service";
import {Product} from "./product.model";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {
    }

    @Post()
    addProduct(@Body() body: Pick<Product, 'title' | 'description' | 'price'>): { id: Product['id'] } {
        const {title, description, price} = body;
        const productId = this.productsService.insertProduct(title, description, price);
        return {id: productId};
    }

    @Get()
    getAllProducts(): Product[] {
        return this.productsService.getProducts();
    }

    @Get('/id')
    getProduct(@Body() body: Pick<Product, 'id'>): Product {
        const product = this.productsService.getProductById(body.id);
        if (product === undefined) {
            throw new NotFoundException();
        } else {
            return product;
        }
    }
}