import type {Stade} from "~/types/Stade";
import {useMatchsStore} from "~/stores/useMatchsStore";
import type {Api} from "~/plugins/api";

export const useStadesStore = (api: Api) => {
    const {getMatchsEnCours} = useMatchsStore(api);
    const stades = useState<Stade[]>('stades', () => [])

    const getStadesDisponibles = computed(() => {
        return stades.value.filter(s => !getMatchsEnCours.value.some(m => m.stade_id === s.id))
    })

    const isDisponible = (id:number) => {
        return getStadesDisponibles.value.map(s => s.id).includes(id)
    }

    const getNomStadeById = (id:number) => {
        return stades.value.find(s => s.id === id)?.nom
    }

    const setStades = (nouveauxStades: Stade[]) => {
        stades.value = nouveauxStades;
    }

    const createStade = async (stade: Stade) => {
        const nouveauStade = await api.post<Stade>('/stades', stade)
        stades.value.push(nouveauStade!.data)
    }

    const editStade = async (stade: Partial<Stade>) => {
        await api.patch<Stade>(`/stades/${stade.id}`, {nom: stade.nom})
        stades.value = stades.value.map(p => p.id === stade.id ? {
            ...p,
            nom: stade.nom!
        } : p)
    }

    const deleteStade = async(id: number) => {
        await api.delete<Stade>(`/stades/${id}`)
        stades.value = stades.value.filter(p => p.id !== id)
    }

    return {
        stades,
        getStadesDisponibles,
        isDisponible,
        setStades,
        createStade,
        editStade,
        deleteStade,
        getNomStadeById
    }
}
