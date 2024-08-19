import type {Poule} from "~/types/Poule";

const {triParPoints} = useCalcul()
export const usePoule = () => {
    const getQualifiesPoule = (poule: Poule) => {
        let listeQualifies: number[] = [];
        let tab = [...poule.joueurs];

        tab = tab.filter(j => !j.tableau_final_id)
        const palier = Math.round(tab.length / 2);
        tab.sort(triParPoints);

        for (let i = 0; i < palier; i++) {
            listeQualifies.push(tab[i].id!);
        }

        return listeQualifies;
    };

    return {getQualifiesPoule};
}