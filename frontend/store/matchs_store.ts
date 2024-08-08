import type {Match} from "~/types/Match";

export const useMatchsStore = defineStore('matchs', {
    state: () => ({
        matchs: [] as Match[],
    }),
    getters: {
        getMatchsEnCours(state) {
            return state.matchs.filter(m => m.statut === 'en_cours')
        }
    },
    actions: {
        setMatchs(matchs: Match[]) {
            this.matchs = matchs;
        },
        async createMatch(match: Partial<Match>) {
            const {$api} = useNuxtApp()
            const nouveauMatch = await $api.post<Match>('/matchs_tournois', match)
            this.matchs.push(nouveauMatch!.data)
        },
        async editMatch(match: Partial<Match>) {
            const {$api} = useNuxtApp()
            await $api.patch<Match>(`/matchs_tournois/${match.id}`, {
                score_1: match.score_1,
                score_2: match.score_2,
                statut: match.statut!
            })
            this.matchs = this.matchs.map(m => m.id === match.id ? {
                ...m,
                score_1: match.score_1!,
                score_2: match.score_2!,
                statut: match.statut!
            } : m)
        },
        async deleteMatch(id: number) {
            const {$api} = useNuxtApp()
            await $api.delete<Match>(`/matchs_tournois/${id}`)
            this.matchs = this.matchs.filter(p => p.id !== id)
        }
    }
});
