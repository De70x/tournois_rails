import type {Match} from "~/types/Match";

export const useMatchsStore = () => {
    const matchs = useState<Match[]>('matchs', () => [])

    const getMatchsEnCours = computed(() => matchs.value.filter(m => m.statut === 'en_cours'))

    const setMatchs = (nouveauxMatchs: Match[]) => {
        matchs.value = nouveauxMatchs;
    }

    const createMatch = async (match: Partial<Match>) => {
        const {$api} = useNuxtApp()
        const nouveauMatch = await $api.post<Match>('/matchs_tournois', match)
        matchs.value.push(nouveauMatch!.data)
    }

    const editMatch = async (match: Partial<Match>) => {
        const {$api} = useNuxtApp()
        await $api.patch<Match>(`/matchs_tournois/${match.id}`, {
            score_1: match.score_1,
            score_2: match.score_2,
            statut: match.statut!
        })
        matchs.value = matchs.value.map(m => m.id === match.id ? {
            ...m,
            score_1: match.score_1!,
            score_2: match.score_2!,
            statut: match.statut!
        } : m)
    }

    const deleteMatch = async (id: number) => {
        const {$api} = useNuxtApp()
        await $api.delete<Match>(`/matchs_tournois/${id}`)
        matchs.value = matchs.value.filter(p => p.id !== id)
    }

    return {
        matchs,
        getMatchsEnCours,
        setMatchs,
        createMatch,
        editMatch,
        deleteMatch
    }

}
