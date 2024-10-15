import {object, string, number, type InferType, array} from 'yup';
import {joueurSchema} from "~/types/Joueur";

export const tableauSchema = object({
    id: number(),
    tournoi_id: number().required(),
    nom: string().required('Required'),
    joueurs: array().of(joueurSchema).required('Required').default([])
});

export type Tableau = InferType<typeof tableauSchema>;