import { Bookshop } from "./bookshop.interface";
import { Category } from "./category.interface";

export interface Book {
    id: number;
    name: string;
    author: string;
    items: number;
    price: number;
    cover: string;
    category: Category;
    book_shop: Bookshop;
    book_shop_id: number;
    category_id: number;
    created_at: string;
    updated_at: string;
}
