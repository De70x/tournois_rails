import type {Joueur} from "~/types/Joueur";
import {useTournoisStore} from "~/store/tournois_store";

export const useJoueursStore = defineStore('joueurs', {
    state: () => ({
        joueurs: [] as Joueur[],
        joueurFictif: {} as Joueur,
        joueurEnEttente: {} as Joueur
    }),
    getters: {
        getJoueursSansPoules: (state) => {
            return state.joueurs.filter(j => !j.poule_id)
        },
        getJoueurParPoule: (state) => (pouleId: number) => {
            return state.joueurs.filter(j => j.poule_id === pouleId)
        }
    },
    actions: {
        setJoueurs(joueurs: Joueur[]) {
          this.joueurs = joueurs;
        },
        async createJoueur(joueur: Joueur) {
            const {$api} = useNuxtApp()
            try {
                await $api.post('/joueurs', joueur)
                this.joueurs.push(joueur)
            } catch (error) {
                console.error('Erreur à la création du joueur:', error, joueur);
            }
        },
        async editJoueur(joueur: Partial<Joueur>) {
            const {$api} = useNuxtApp()
            try {
                await $api.patch(`/joueurs/${joueur.id}`, {nom: joueur.nom})
                this.joueurs = this.joueurs.map(j => j.id === joueur.id ? {
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
                this.joueurs = this.joueurs.filter(t => t.id !== id)
            } catch (error) {
                console.error('Erreur à la suppression du joueur:', error, id);
            }
        },
    }
});
