import type {Tournoi} from "~/types/Tournoi";
import type {Joueur} from "~/types/Joueur";
import {useJoueursStore} from "~/store/joueurs_store";

export const useTournoisStore = defineStore('tournois', {
    state: () => ({
        tournois: [] as Tournoi[],
        tournoiActif: {} as Tournoi
    }),
    actions: {
        async fetchTournois() {
            const {$api} = useNuxtApp()
            try {
                const response = await $api.get('/tournois');
                if (response) {
                    this.tournois = response.data
                }
            } catch (error) {
                console.error('Erreur à la récupération des tournois:', error);
            }
        },
        async createTournoi(tournoi: Tournoi) {
            const {$api} = useNuxtApp()
            try {
                await $api.post('/tournois', tournoi)
                this.tournois.push(tournoi)
            } catch (error) {
                console.error('Erreur à la création du tournoi:', error, tournoi);
            }
        },
        async deleteTournoi(id: number) {
            const {$api} = useNuxtApp()
            try {
                await $api.delete(`/tournois/${id}`)
                this.tournois = this.tournois.filter(t => t.id !== id)
            } catch (error) {
                console.error('Erreur à la suppression du tournoi:', error, id);
            }
        },
        async setActif(id: number) {
            const {$api} = useNuxtApp()
            try {
                const response = await $api.get(`/tournois/${id}`)
                if (response) {
                    const joueursStore = useJoueursStore()
                    this.tournoiActif = response.data
                    joueursStore.setJoueurs(response.data.joueurs)
                    this.tournoiActif.joueurs = joueursStore.joueurs
                }
            } catch (error) {
                console.error('Erreur à la suppression du tournoi:', error, id);
            }
        },
        ajouterJoueur(joueur: Joueur) {
            this.tournoiActif.joueurs.push(joueur)
        }
    }
});
