import {object, string, number, type InferType, boolean} from 'yup';
import {joueurSchema} from "~/types/Joueur";

export const stadeSchema = object({
    id: number(),
    tournoi_id: number().required(),
    nom: string().required('Required'),
    disponible: boolean().required()
});

export type Stade = InferType<typeof stadeSchema>;