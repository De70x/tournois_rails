import * as yup from 'yup';
import {userSchema} from "~/types/User";
import {productSchema} from "~/types/Product";

export function getInputType(yupSchema: any, property: string | number): string {
    const schemaField = yupSchema.fields[property];

    if (schemaField instanceof yup.StringSchema) {
        return 'text';
    } else if (schemaField instanceof yup.NumberSchema) {
        return 'number';
    } else if (schemaField instanceof yup.DateSchema) {
        return 'date';
    }
    // Add more mappings as needed

    return 'text';
}

export function getSchema(objectType: String) {
    if (objectType === 'user') {
        return userSchema
    }
    if (objectType === 'product') {
        return productSchema
    }
}