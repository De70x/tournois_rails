import type {Joueur} from "~/types/Joueur";
import type {Poule} from "~/types/Poule";

export const usePoulesStore = defineStore('poules', {
    state: () => ({
        poules: [] as Poule[],
    }),
    actions: {
        setPoules(poules: Poule[]) {
            this.poules = poules;
        },
        async createPoule(poule: Poule) {
            const {$api} = useNuxtApp()
            await $api.post('/poules', poule)
            this.poules.push(poule)
        },
        async deletePoule(id: number) {
            const {$api} = useNuxtApp()
            await $api.delete(`/poules/${id}`)
            this.poules = this.poules.filter(p => p.id !== id)
        },
        async addJoueurToPoule(joueur_id: number, poule_id: number) {
            const {$api} = useNuxtApp()
            await $api.patch(`/poules/${poule_id}`, joueur_id)
        }
    }
});
