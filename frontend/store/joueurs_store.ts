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
        async editJoueur(joueur: Partial<Joueur>) {
            const {$api} = useNuxtApp()
            try {
                await $api.patch(`/joueurs/${joueur.id}`, {nom: joueur.nom})
                useTournoisStore().tournoiActif.joueurs = useTournoisStore().tournoiActif.joueurs.map(j => j.id === joueur.id ? {
                    ...j,
                    nom: joueur.nom!
                } : j)
            } catch (error) {
                console.error('Erreur à la création du joueur:', error, joueur);
            }
        },
        async deleteJoueur(id: number) {
            const {$api} = useNuxtApp()
            try {
                await $api.delete(`/joueurs/${id}`)
                useTournoisStore().tournoiActif.joueurs = useTournoisStore().tournoiActif.joueurs.filter(t => t.id !== id)
            } catch (error) {
                console.error('Erreur à la suppression du joueur:', error, id);
            }
        },
    }
});
