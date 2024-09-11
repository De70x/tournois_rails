import type {Stade} from "~/types/Stade";
import {useMatchsStore} from "~/store/matchs_store";

export const useStadesStore = () => {
    const {getMatchsEnCours} = useMatchsStore();
    const stades = useState<Stade[]>('stades', () => [])

    const getStadesDisponibles = computed(() => {
        return stades.value.filter(s => !getMatchsEnCours.value.some(m => m.stade_id === s.id))
    })

    const isDisponible = (id:number) => {
        return getStadesDisponibles.value.map(s => s.id).includes(id)
    }

    const setStades = (nouveauxStades: Stade[]) => {
        stades.value = nouveauxStades;
    }

    const createStade = async (stade: Stade) => {
        const {$api} = useNuxtApp()
        const nouveauStade = await $api.post<Stade>('/stades', stade)
        stades.value.push(nouveauStade!.data)
    }

    const editStade = async (stade: Partial<Stade>) => {
        const {$api} = useNuxtApp()
        await $api.patch<Stade>(`/stades/${stade.id}`, {nom: stade.nom})
        stades.value = stades.value.map(p => p.id === stade.id ? {
            ...p,
            nom: stade.nom!
        } : p)
    }

    const deleteStade = async(id: number) => {
        const {$api} = useNuxtApp()
        await $api.delete<Stade>(`/stades/${id}`)
        stades.value = stades.value.filter(p => p.id !== id)
    }

    return {
        stades,
        getStadesDisponibles,
        isDisponible,
        setStades,
        createStade,
        editStade,
        deleteStade
    }
}
