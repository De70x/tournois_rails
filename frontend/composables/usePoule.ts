import type {Poule} from "~/types/Poule";

const {triParPoints} = useCalcul()
export const usePoule = () => {
    const getQualifiesPoule = (poule: Poule) => {
        return poule.joueurs
            .filter(j => !j.tableau_final_id)
            .sort((a, b) => triParPoints(a, b))
            .slice(0, Math.ceil(poule.joueurs.length / 2))
            .map(j => j.id!)
    };

    return {getQualifiesPoule};
}