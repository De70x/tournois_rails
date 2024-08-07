import type {Match} from "~/types/Match";

export const useMatchsStore = defineStore('matchs', {
    state: () => ({
        matchs: [] as Match[],
    }),
    getters:{
      getMatchsEnCours(state){
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
            await $api.patch<Match>(`/matchs_tournois/${match.id}`, {score1: match.score1, score2: match.score2})
            this.matchs = this.matchs.map(m => m.id === match.id ? {
                ...m,
                score1: match.score1!,
                score2: match.score2!
            } : m)
        },
        async deleteMatch(id: number) {
            const {$api} = useNuxtApp()
            await $api.delete<Match>(`/matchs_tournois/${id}`)
            this.matchs = this.matchs.filter(p => p.id !== id)
        }
    }
});
