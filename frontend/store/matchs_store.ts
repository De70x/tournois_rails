import type {Match} from "~/types/Match";
import {id} from "postcss-selector-parser";

export const useMatchsStore = defineStore('matchs', {
    state: () => ({
        matchs: [] as Match[],
    }),
    actions: {
        setMatchs(matchs: Match[]) {
            this.matchs = matchs;
        },
        async createMatch(match: Match) {
            const {$api} = useNuxtApp()
            const nouveauMatch = await $api.post('/matchs', match)
            this.matchs.push(nouveauMatch!.data)
        },
        async editMatch(match: Partial<Match>) {
            const {$api} = useNuxtApp()
            await $api.patch(`/matchs/${match.id}`, {score1: match.score1, score2: match.score2})
            this.matchs = this.matchs.map(m => m.id === match.id ? {
                ...m,
                score1: match.score1!,
                score2: match.score2!
            } : m)
        },
        async deleteMatch(id: number) {
            const {$api} = useNuxtApp()
            await $api.delete(`/matchs/${id}`)
            this.matchs = this.matchs.filter(p => p.id !== id)
        }
    }
});
