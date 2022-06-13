import { Book } from './book.interface';
import { User } from './user.interface';

export interface Bookshop {
    id: number;
    name: string;
    location: string;
    phone: string;
    created_at: string;
    updated_at: string;
    user_id: User['id'];
    books: Book[];
}
