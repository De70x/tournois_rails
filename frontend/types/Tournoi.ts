import {object, string, number, array, type InferType} from 'yup';
import {joueurSchema} from "~/types/Joueur";
import {pouleSchema} from "~/types/Poule";
import {stadeSchema} from "~/types/Stade";

export const tournoiSchema = object({
    id: number(),
    nom: string().required('Required'),
    annee: number().required('Required'),
    joueurs: array().of(joueurSchema).required().default([]),
    poules: array().of(pouleSchema).required().default([]),
    stades: array().of(stadeSchema).required().default([])
});

export type Tournoi = InferType<typeof tournoiSchema>;