import {object, string, number, type InferType} from 'yup';

export const joueurSchema = object({
    id: number(),
    tournoi_id: number().required(),
    poule_id: number(),
    nom: string().required('Required'),
    nb_matchs: number().required('Required').default(0)
});

export type Joueur = InferType<typeof joueurSchema>;