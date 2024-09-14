import {array, type InferType, number, object, string} from 'yup';
import {joueurSchema} from "~/types/Joueur";
import {pouleSchema} from "~/types/Poule";
import {stadeSchema} from "~/types/Stade";
import {matchSchema} from "~/types/Match";
import {tableauSchema} from "~/types/Tableau";
import {tagSchema} from "~/types/Tag";

export const tournoiSchema = object({
    id: number(),
    nom: string().required('Required'),
    annee: number().required('Required'),
    joueurs: array().of(joueurSchema).required().default([]),
    poules: array().of(pouleSchema).required().default([]),
    stades: array().of(stadeSchema).required().default([]),
    matchs: array().of(matchSchema).required().default([]),
    tableaux: array().of(tableauSchema).required().default([]),
    tags: array().of(tagSchema).required().default([]),
});

export type Tournoi = InferType<typeof tournoiSchema>;