import type {Poule} from "~/types/Poule";

const {triParPoints} = useCalcul()
export const usePoule = () => {
    const getQualifiesPoule = (poule: Poule) => {
        let listeQualifies: number[] = [];
        const taillePoule = poule.joueurs.length;
        const palier = Math.round(taillePoule / 2);

        // on trie les joueurs par points
        let tab = [...poule.joueurs];
        tab.sort(triParPoints);

        for (let i = 0; i < palier; i++) {
            listeQualifies.push(tab[i].id!);
        }

        return listeQualifies;
    };

    return {getQualifiesPoule};
}