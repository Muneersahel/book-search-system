export interface NavigationLink {
    name: string;
    path: string;
    icon: string;
}

export const adminNavigationLinks: NavigationLink[] = [
    {
        name: 'Dashboard',
        icon: 'dashboard',
        path: '/admin/dashboard',
    },
    {
        name: 'Users',
        icon: 'people',
        path: '/admin/users',
    },
    {
        name: 'Bookshops',
        icon: 'local_library',
        path: '/admin/bookshops',
    },
    {
        name: 'Books',
        icon: 'book',
        path: '/admin/books',
    },
    {
        name: 'Categories',
        icon: 'category',
        path: '/admin/categories',
    },
];
