import { Book } from './book.interface';
import { Bookshop } from './bookshop.interface';

export interface UserInfo {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    isActive: boolean;
    isAdmin: boolean;
    created_at: string;
    updated_at: string;
    book_shops: Bookshop[];
    books: Book[];
}
