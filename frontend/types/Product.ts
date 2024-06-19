import {object, string, number, type InferType, date} from 'yup';

export const productSchema = object({
    name: string().required('Required'),
    description: string(),
    quantity: number().required('Required'),
    price: number().required('Required'),
    dateAdded: date().required('Required')  // Use string for date, adjust accordingly
});

export type Product = InferType<typeof productSchema>;