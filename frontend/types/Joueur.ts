import {object, string, number, type InferType, array} from 'yup';
import {matchSchema} from "~/types/Match";

export const joueurSchema = object({
    id: number(),
    tournoi_id: number().required(),
    poule_id: number(),
    nom: string().required('Required'),
    nb_matchs: number().default(0),
    matchs: array().of(matchSchema).default([]),
    points: number().default(0),
    tableau_final_id: number().nullable(),
});

export type Joueur = InferType<typeof joueurSchema>;