
import React from 'react'; 

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
}


type ColumnDefinition<T> = {
    header: string;
    accessor: keyof T | ((row: T) => React.ReactNode);
};


export const userColumns: ColumnDefinition<User>[] = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Username", accessor: "username" },
    { header: "Email", accessor: "email" },
    
    { header: "City", accessor: (row: User) => row.address.city },
    { header: "Phone", accessor: "phone" },
    
    { header: "Company", accessor: (row: User) => row.company.name },
];