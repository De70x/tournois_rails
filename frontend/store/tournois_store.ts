import type {Tournoi} from "~/types/Tournoi";

export const useTournoisStore = defineStore('tournois', {
    state: () => ({
        tournois: [] as Tournoi[],
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
        }
    }
});
