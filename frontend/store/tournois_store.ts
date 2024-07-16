import type {Tournoi} from "~/types/Tournoi";
import type {Joueur} from "~/types/Joueur";
import {useJoueursStore} from "~/store/joueurs_store";
import {usePoulesStore} from "~/store/poules_store";
import {useStadesStore} from "~/store/stades_store";
import {useMatchsStore} from "~/store/matchs_store";

export const useTournoisStore = defineStore('tournois', {
    state: () => ({
        tournois: [] as Tournoi[],
        tournoiActif: {} as Tournoi
    }),
    actions: {
        async fetchTournois() {
            const {$api} = useNuxtApp()
            const response = await $api.get('/tournois');
            if (response) {
                this.tournois = response.data
            }
        },
        async createTournoi(tournoi: Tournoi) {
            const {$api} = useNuxtApp()
            await $api.post('/tournois', tournoi)
            this.tournois.push(tournoi)
        },
        async deleteTournoi(id: number) {
            const {$api} = useNuxtApp()
            await $api.delete(`/tournois/${id}`)
            this.tournois = this.tournois.filter(t => t.id !== id)
        },
        async setActif(id: number) {
            const {$api} = useNuxtApp()
            const joueursStore = useJoueursStore()
            const poulesStore = usePoulesStore()
            const stadesStore = useStadesStore()
            const matchsStore = useMatchsStore()
            const response = await $api.get(`/tournois/${id}`)
            if (response) {
                this.tournoiActif = response.data
                joueursStore.setJoueurs(response.data.joueurs)
                this.tournoiActif.joueurs = joueursStore.joueurs
                poulesStore.setPoules(response.data.poules)
                this.tournoiActif.poules = poulesStore.poules
                stadesStore.setStades(response.data.stades)
                this.tournoiActif.stades = stadesStore.stades
                matchsStore.setMatchs(response.data.matchs)
                this.tournoiActif.matchs = matchsStore.matchs
            }
        },
        ajouterJoueur(joueur: Joueur) {
            this.tournoiActif.joueurs.push(joueur)
        }
    }
});
