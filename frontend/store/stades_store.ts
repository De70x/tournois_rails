import type {Stade} from "~/types/Stade";
import {useMatchsStore} from "~/store/matchs_store";
import {id} from "postcss-selector-parser";

export const useStadesStore = defineStore('stades', {
    state: () => ({
        stades: [] as Stade[],
    }),
    getters:{
        getStadesDisponibles: (state) : Stade[] => {
            const matchsEnCours = useMatchsStore().getMatchsEnCours
            return state.stades.filter(s => !matchsEnCours.some(m => m.stade_id === s.id))
        }
    },
    actions: {
        setStades(stades: Stade[]) {
            this.stades = stades;
        },
        async createStade(stade: Stade) {
            const {$api} = useNuxtApp()
            const nouveauStade = await $api.post<Stade>('/stades', stade)
            this.stades.push(nouveauStade!.data)
        },
        async editStade(stade: Partial<Stade>) {
            const {$api} = useNuxtApp()
            await $api.patch<Stade>(`/stades/${stade.id}`, {nom: stade.nom})
            this.stades = this.stades.map(p => p.id === stade.id ? {
                ...p,
                nom: stade.nom!
            } : p)
        },
        async deleteStade(id: number) {
            const {$api} = useNuxtApp()
            await $api.delete<Stade>(`/stades/${id}`)
            this.stades = this.stades.filter(p => p.id !== id)
        }
    }
});
