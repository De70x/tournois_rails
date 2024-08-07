import {object, string, number, type InferType, array} from 'yup';
import {joueurSchema} from "~/types/Joueur";

export const pouleSchema = object({
    id: number(),
    tournoi_id: number().required(),
    nom: string().required('Required'),
    joueurs: array().of(joueurSchema).required('Required').default([])
});

export type Poule = InferType<typeof pouleSchema>;