import {useJoueursStore} from "~/store/joueurs_store";

export const useJoueur = () => {
    const joueursStore = useJoueursStore()
    const getNomJoueurById = (id: number) => {
        return joueursStore.joueurs.value.find(j => j.id === id)!.nom
    }

    return {getNomJoueurById}
}