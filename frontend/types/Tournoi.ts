import {object, string, number, type InferType} from 'yup';

export const tournoiSchema = object({
    nom: string().required('Required'),
    annee: number().required('Required'),
});

export type Tournoi = InferType<typeof tournoiSchema>;