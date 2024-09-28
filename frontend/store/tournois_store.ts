import type {Tournoi} from "~/types/Tournoi";
import {useJoueursStore} from "~/store/joueurs_store";
import {usePoulesStore} from "~/store/poules_store";
import {useStadesStore} from "~/store/stades_store";
import {useMatchsStore} from "~/store/matchs_store";
import {useTableauxStore} from "~/store/phases_finales_store";
import {useTagsStore} from "~/store/tags_store";
import type {Api} from "~/plugins/api";

export const useTournoisStore = (api: Api) => {
    const tournois = useState<Tournoi[]>('tournois', () => [])
    const tournoiActif = useState<Tournoi | null>('tournoiActif', () => null)

    const fetchTournois = async () => {
        const {$api} = useNuxtApp()
        const response = await $api.get<Tournoi[]>('/tournois');
        if (response) {
            tournois.value = response.data
        }
    }

    const createTournoi = async (tournoi: Tournoi) => {
        const {$api} = useNuxtApp()
        const nouveauTournoi = await $api.post<Tournoi>('/tournois', tournoi)
        if (nouveauTournoi) {
            tournois.value.push(nouveauTournoi.data)
        }
    }

    const deleteTournoi = async (id: number) => {
        const {$api} = useNuxtApp()
        await $api.delete<Tournoi>(`/tournois/${id}`)
        tournois.value = tournois.value.filter(t => t.id !== id)
    }

    const setActif = async (id: number) => {
        const {joueurs, setJoueurs} = useJoueursStore(api)
        const {poules, setPoules} = usePoulesStore(api)
        const {stades, setStades} = useStadesStore(api)
        const {matchs, setMatchs} = useMatchsStore(api)
        const {tableaux, setTableaux} = useTableauxStore(api)
        const {tags, setTags} = useTagsStore(api)
        const response = await api.get<Tournoi>(`/tournois/${id}`)
        if (response) {
            tournoiActif.value = response.data
            const tournoiActifIdCookie = useCookie('tournoiActifId', {
                maxAge: 60 * 60 * 24 * 7, // 7 jours
                sameSite: 'strict'
            })
            tournoiActifIdCookie.value = id.toString()
            setJoueurs(response.data.joueurs)
            tournoiActif.value.joueurs = joueurs.value
            setPoules(response.data.poules)
            tournoiActif.value.poules = poules.value
            setStades(response.data.stades)
            tournoiActif.value.stades = stades.value
            setMatchs(response.data.matchs)
            tournoiActif.value.matchs = matchs.value
            setTableaux(response.data.tableaux)
            tournoiActif.value.tableaux = tableaux.value
            setTags(response.data.tags)
            tournoiActif.value.tags = tags.value
        }
    }

    const initTournoiActif = async () => {
        const tournoiActifId = useCookie('tournoiActifId').value
        if (tournoiActifId) {
            await setActif(parseInt(tournoiActifId))
        }
    }

    return {
        tournois,
        tournoiActif,
        fetchTournois,
        createTournoi,
        deleteTournoi,
        setActif,
        initTournoiActif
    }

}
