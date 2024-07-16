import type {Stade} from "~/types/Stade";

export const useStadesStore = defineStore('stades', {
    state: () => ({
        stades: [] as Stade[],
    }),
    actions: {
        setStades(stades: Stade[]) {
            this.stades = stades;
        },
        async createStade(stade: Stade) {
            const {$api} = useNuxtApp()
            const nouveauStade = await $api.post('/stades', stade)
            this.stades.push(nouveauStade!.data)
        },
        async editStade(stade: Partial<Stade>) {
            const {$api} = useNuxtApp()
            await $api.patch(`/stades/${stade.id}`, {nom: stade.nom})
            this.stades = this.stades.map(p => p.id === stade.id ? {
                ...p,
                nom: stade.nom!
            } : p)
        },
        async deleteStade(id: number) {
            const {$api} = useNuxtApp()
            await $api.delete(`/stades/${id}`)
            this.stades = this.stades.filter(p => p.id !== id)
        }
    }
});
