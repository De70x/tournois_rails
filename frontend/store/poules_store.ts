import type {Poule} from "~/types/Poule";
import type {Joueur} from "~/types/Joueur";

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
            const nouvellePoule = await $api.post('/poules', poule)
            this.poules.push(nouvellePoule!.data)
        },
        async editPoule(poule: Partial<Poule>) {
            const {$api} = useNuxtApp()
            await $api.patch(`/poules/${poule.id}`, {nom: poule.nom})
            this.poules = this.poules.map(p => p.id === poule.id ? {
                ...p,
                nom: poule.nom!
            } : p)
        },
        async deletePoule(id: number) {
            const {$api} = useNuxtApp()
            await $api.delete(`/poules/${id}`)
            this.poules = this.poules.filter(p => p.id !== id)
        }
    }
});
