import type {Joueur} from "~/types/Joueur";
import {useTournoisStore} from "~/store/tournois_store";
export const useJoueursStore = defineStore('joueurs', {
    state: () => ({
        joueurs: useTournoisStore().tournoiActif.joueurs as Joueur[],
    }),
    actions: {
        async createJoueur(joueur: Joueur) {
            const {$api} = useNuxtApp()
            try {
                await $api.post('/joueurs', joueur)
                useTournoisStore().tournoiActif.joueurs.push(joueur)
            } catch (error) {
                console.error('Erreur à la création du joueur:', error, joueur);
            }
        },
        async deleteJoueur(id: number) {
            const {$api} = useNuxtApp()
            try {
                await $api.delete(`/joueurs/${id}`)
                this.joueurs = this.joueurs.filter(t => t.id !== id)
            } catch (error) {
                console.error('Erreur à la suppression du joueur:', error, id);
            }
        },
    }
});
