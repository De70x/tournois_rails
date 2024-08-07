import {type InferType, number, object, string} from 'yup';

export const matchSchema = object({
    id: number(),
    tournoi_id: number().required(),
    stade_id: number().required('Required'),
    joueur1_id: number().required('Required'),
    joueur2_id: number().required('Required'),
    score1: number().required('Required').default(0),
    score2: number().required('Required').default(0),
    statut: string().required('Required').default('init'),
    phase: number().required('Required').default(0),
});

export type Match = InferType<typeof matchSchema>;