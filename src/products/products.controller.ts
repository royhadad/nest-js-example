import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {ProductsService} from "./products.service";
import {Product, ProductId, ProductMutableProperties} from "./product.model";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {
    }

    @Post()
    addProduct(@Body() body: ProductMutableProperties): { id: ProductId } {
        const {title, description, price} = body;
        const productId = this.productsService.insertProduct(title, description, price);
        return {id: productId};
    }

    @Get()
    getAllProducts(): Product[] {
        return this.productsService.getProducts();
    }

    @Get(':id')
    getProduct(@Param('id') productId: ProductId): Product {
        return this.productsService.getProductById(productId);
    }

    @Patch(':id')
    updateProduct(@Param('id') productId: ProductId, @Body() propertiesToUpdate: Partial<ProductMutableProperties>): Product {
        return this.productsService.updateProduct(productId, propertiesToUpdate);
    }

    @Delete(':id')
    removeProduct(@Param('id') productId: ProductId): Product {
        return this.productsService.deleteProduct(productId);
    }
}