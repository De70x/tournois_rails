import type {Poule} from "~/types/Poule";

export const usePoulesStore = () => {
    const poules = useState<Poule[]>('poules', () => [])

    const setPoules = (nouvellesPoules: Poule[]) => {
        poules.value = nouvellesPoules;
    }

    const getPoule = (id: number) => {
        return poules.value.find((poule) => poule.id === id)
    }

    const createPoule = async (poule: Poule) => {
        const {$api} = useNuxtApp()
        const nouvellePoule = await $api.post<Poule>('/poules', poule)
        poules.value.push(nouvellePoule!.data)
    }

    const editPoule = async (poule: Partial<Poule>) => {
        const {$api} = useNuxtApp()
        await $api.patch<Poule>(`/poules/${poule.id}`, {nom: poule.nom})
        poules.value = poules.value.map(p => p.id === poule.id ? {
            ...p,
            nom: poule.nom!
        } : p)
    }

    const deletePoule = async (id: number) => {
        const {$api} = useNuxtApp()
        await $api.delete<Poule>(`/poules/${id}`)
        poules.value = poules.value.filter(p => p.id !== id)
    }

    return {
        poules,
        setPoules,
        getPoule,
        createPoule,
        editPoule,
        deletePoule
    }
}
