import {object, string, number, type InferType} from 'yup';

export const tournoiSchema = object({
    id: number(),
    nom: string().required('Required'),
    annee: number(),
});

export type Tournoi = InferType<typeof tournoiSchema>;