import {object, string, number, type InferType} from 'yup';

export const joueurSchema = object({
    id: number(),
    tournoi_id: number().required(),
    poule_id: number(),
    nom: string().required('Required'),
});

export type Joueur = InferType<typeof joueurSchema>;