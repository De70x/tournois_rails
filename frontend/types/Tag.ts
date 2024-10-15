import {type InferType, number, object, string} from 'yup';

export const tagSchema = object({
    id: number(),
    tournoi_id: number().required(),
    nom: string().required('Required'),
    icon: string()
});

export type Tag = InferType<typeof tagSchema>;