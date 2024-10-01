import {type InferType, number, object, string} from 'yup';

export enum MatchStatuses {
  INIT = 'init',
  EN_COURS = 'en_cours',
  TERMINE = 'termine'
}

export const matchSchema = object({
  id: number(),
  tournoi_id: number().required(),
  stade_id: number().required('Required'),
  joueur1_id: number().required('Required'),
  joueur2_id: number().required('Required'),
  score_1: number().required('Required').default(0),
  score_2: number().required('Required').default(0),
  statut: string().oneOf(Object.values(MatchStatuses), 'Statut invalide').required('Le statut est requis'),
  phase: number().required('Required').default(0),
  indice: number()
});

export type Match = InferType<typeof matchSchema>;