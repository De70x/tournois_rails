import type {Joueur} from "~/types/Joueur";
import {usePoulesStore} from "~/store/poules_store";

export const useJoueursStore = defineStore('joueurs', {
    state: () => ({
        joueurs: [] as Joueur[],
        joueurFictif: {} as Joueur,
        joueurEnAttente: {} as Joueur
    }),
    getters: {
        getJoueursSansPoules: (state) => {
            return state.joueurs.filter(j => !j.poule_id)
        },
        getJoueurParPoule: (state) => (pouleId: number) => {
            return state.joueurs.filter(j => j.poule_id === pouleId)
        },
        getAdversairesValides: (state) => (joueurId: number, pouleId: number) => {
            const joueur = state.joueurs.find(j => j.id === joueurId);
            if (!joueur) return [];

            const adversairesJoues = new Set(
                joueur.matchs.map(m =>
                    m.joueur1_id === joueur.id ? m.joueur2_id : m.joueur1_id
                )
            );

            return state.joueurs.filter(j =>
                j.id !== joueurId &&
                j.poule_id === pouleId &&
                !adversairesJoues.has(j.id!) &&
                !j.matchs.some(m => m.status === 0)
            );
        },
        getJoueursDisponiblesDansPoule: (state) => (pouleId: number) => {
            return state.joueurs.filter(j =>
                j.poule_id === pouleId &&
                !j.matchs.some(m => m.status === 0)
            );
        }
    },
    actions: {
        setJoueurs(joueurs: Joueur[]) {
            this.joueurs = joueurs;
        },
        async createJoueur(joueur: Joueur) {
            const {$api} = useNuxtApp()
            const nouveauJoueur = await $api.post('/joueurs', joueur)
            this.joueurs.push(nouveauJoueur!.data)
        },
        async editJoueur(joueur: Joueur) {
            const {$api} = useNuxtApp()
            const poulesStore = usePoulesStore()
            const poule = poulesStore.getPoule(joueur.poule_id!)
            if (poule) {
                if (!poule.joueurs.map(j => j.id).includes(joueur.id)) {
                    poule.joueurs.push(joueur)
                }
            }
            await $api.patch(`/joueurs/${joueur.id}`, {
                nom: joueur.nom,
                poule_id: joueur.poule_id === undefined ? null : joueur.poule_id,
                tournoi_id: joueur.tournoi_id
            })
            this.joueurs = this.joueurs.map(j => j.id === joueur.id ? joueur : j)
        },
        async desinscrireJoueur(joueur: Joueur) {
            const {$api} = useNuxtApp()
            const poulesStore = usePoulesStore()
            await $api.patch(`/joueurs/${joueur.id}`, {
                nom: joueur.nom,
                poule_id: null,
                tournoi_id: joueur.tournoi_id
            })
            const poule = poulesStore.getPoule(joueur.poule_id!)
            if (poule) {
                poule.joueurs = poule.joueurs.filter(j => j.id !== joueur.id)
            }
            this.joueurs = this.joueurs.map(j => {
                return j.id === joueur.id ? {...joueur, poule_id: undefined} : j
            })
        },
        async deleteJoueur(id: number) {
            const {$api} = useNuxtApp()
            await $api.delete(`/joueurs/${id}`)
            this.joueurs = this.joueurs.filter(t => t.id !== id)
        },
    }
});
