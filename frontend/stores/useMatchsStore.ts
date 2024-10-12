import type {Match} from "~/types/Match";
import type {ComputedRef} from "vue";
import type {Api} from "~/plugins/api";
import {useJoueursStore} from "~/stores/useJoueursStore";
import {MatchStatuses} from "~/types/Match";

export const useMatchsStore = (api: Api) => {
  const {joueurFictif} = useJoueursStore(api)

  const matchs = useState<Match[]>('matchs', () => [])

  const getMatchsEnCours: ComputedRef<Match[]> = computed(() => matchs.value.filter(m => m.statut === 'en_cours'))

  const getMatchSuivant: ComputedRef<(match: Match) => Match | undefined> = computed(() => (match: Match) => {
    const indiceSuivant = Math.floor(match.indice! / 2)
    return matchs.value.find(m =>
      m.phase === match.phase + 1
      && m.indice === indiceSuivant
      && m.tableau_final_id === match.tableau_final_id)
  })

  const setMatchs = (nouveauxMatchs: Match[]) => {
    matchs.value = nouveauxMatchs;
  }

  const createMatch = async (match: Partial<Match>) => {
    const nouveauMatch = await api.post<Match>('/matchs_tournois', match)
    matchs.value.push(nouveauMatch!.data)
    return nouveauMatch!.data
  }

  const getByesNonTermines = computed(() => matchs.value.filter(m => m.phase === 0 && m.statut !== MatchStatuses.TERMINE && m.joueur2_id === joueurFictif.value!.id))

  const editMatch = async (match: Partial<Match>) => {
    await api.patch<Match>(`/matchs_tournois/${match.id}`, {
      score_1: match.score_1,
      score_2: match.score_2,
      joueur1_id: match.joueur1_id,
      joueur2_id: match.joueur2_id,
      statut: match.statut!
    })
    matchs.value = matchs.value.map(m => m.id === match.id ? {
      ...m,
      score_1: match.score_1!,
      score_2: match.score_2!,
      joueur1_id: match.joueur1_id!,
      joueur2_id: match.joueur2_id!,
      statut: match.statut!
    } : m)
  }

  const deleteMatch = async (id: number) => {
    await api.delete<Match>(`/matchs_tournois/${id}`)
    matchs.value = matchs.value.filter(p => p.id !== id)
  }

  const getMatchsTableau: ComputedRef<(id: number) => Match[]> = computed(() => (idTableau: number) => matchs.value.filter(m => m.tableau_final_id === idTableau))

  return {
    matchs,
    getMatchsEnCours,
    setMatchs,
    createMatch,
    editMatch,
    deleteMatch,
    getMatchsTableau,
    getMatchSuivant,
    getByesNonTermines
  }

}
