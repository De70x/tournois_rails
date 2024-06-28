import {object, string, number, array, type InferType} from 'yup';
import {joueurSchema} from "~/types/Joueur";

export const tournoiSchema = object({
    id: number(),
    nom: string().required('Required'),
    annee: number(),
    joueurs: array().of(joueurSchema).required()
});

export type Tournoi = InferType<typeof tournoiSchema>;