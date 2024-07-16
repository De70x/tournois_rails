import {type InferType, number, object} from 'yup';

export const matchSchema = object({
    id: number(),
    tournoi_id: number().required(),
    stade_id: number().required('Required'),
    joueur_1_id: number().required('Required'),
    joueur_2_id: number().required('Required'),
    score1: number().required('Required').default(0),
    score2: number().required('Required').default(0),
    status: number().required('Required').default(-1),
    phase: number().required('Required').default(0),
});

export type Match = InferType<typeof matchSchema>;