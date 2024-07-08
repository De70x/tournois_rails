import {object, string, number, array, type InferType} from 'yup';
import {joueurSchema} from "~/types/Joueur";
import {pouleSchema} from "~/types/Poule";

export const tournoiSchema = object({
    id: number(),
    nom: string().required('Required'),
    annee: number(),
    joueurs: array().of(joueurSchema).required(),
    poules: array().of(pouleSchema).required()
});

export type Tournoi = InferType<typeof tournoiSchema>;