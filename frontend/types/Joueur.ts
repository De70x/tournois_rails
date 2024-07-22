import {object, string, number, type InferType, array} from 'yup';
import {matchSchema} from "~/types/Match";

export const joueurSchema = object({
    id: number(),
    tournoi_id: number().required(),
    poule_id: number(),
    nom: string().required('Required'),
    nb_matchs: number().required('Required').default(0),
    matchs1: array().of(matchSchema).required('Requires').default([]),
    matchs2: array().of(matchSchema).required('Requires').default([])
});

export type Joueur = InferType<typeof joueurSchema>;