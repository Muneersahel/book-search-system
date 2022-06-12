export interface User {
    id: number;
    name: string;
    email: string;
    isAdmin: boolean;
    isActive: boolean;
    email_verified_at?: any;
    book_shops: [];
    books: [];
    created_at: Date;
    updated_at: Date;
}
