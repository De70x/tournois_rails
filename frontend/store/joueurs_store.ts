import type {Joueur} from "~/types/Joueur";

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
        async editJoueur(joueur: Partial<Joueur>) {
            const {$api} = useNuxtApp()
            await $api.patch(`/joueurs/${joueur.id}`, {nom: joueur.nom})
            this.joueurs = this.joueurs.map(j => j.id === joueur.id ? {
                ...j,
                nom: joueur.nom!
            } : j)
        },
        async deleteJoueur(id: number) {
            const {$api} = useNuxtApp()
            await $api.delete(`/joueurs/${id}`)
            this.joueurs = this.joueurs.filter(t => t.id !== id)
        },
    }
});
