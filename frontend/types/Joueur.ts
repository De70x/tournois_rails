import {array, type InferType, number, object, string} from 'yup';
import {matchSchema} from "~/types/Match";

export enum JoueurTypes {
    CLASSIQUE = 'classique',
    FICTIF = 'fictif',
    ATTENTE = 'attente'
}
export const joueurSchema = object({
    id: number(),
    tournoi_id: number().required(),
    poule_id: number(),
    nom: string().required('Required'),
    nb_matchs: number().default(0),
    matchs: array().of(matchSchema).default([]),
    points: number().default(0),
    tableau_final_id: number().nullable(),
    tag_id: number().nullable(),
    type_joueur: string().oneOf(Object.values(JoueurTypes), 'Type invalide').required('Le type est requis'),
});

export type Joueur = InferType<typeof joueurSchema>;