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
        },
        async createTournoi(tournoi: Tournoi){
            const {$api} = useNuxtApp()
            try {
                await $api.post('/tournois', tournoi)
                this.tournois.push(tournoi)
            } catch (error) {
                console.error('Erreur à la création du tournoi:', error, tournoi);
            }
        },
        async deleteTournoi(id:number){
            const {$api} = useNuxtApp()
            try{
                await $api.delete(`/tournois/${id}`)
                this.tournois = this.tournois.filter(t => t.id !== id)
            }catch (error) {
                console.error('Erreur à la suppression du tournoi:', error, id);
            }
        }
    }
});
