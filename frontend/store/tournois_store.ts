import type {Tournoi} from "~/types/Tournoi";
import {useJoueursStore} from "~/store/joueurs_store";
import {usePoulesStore} from "~/store/poules_store";
import {useStadesStore} from "~/store/stades_store";
import {useMatchsStore} from "~/store/matchs_store";
import {useTableauxStore} from "~/store/phases_finales_store";

export const useTournoisStore = () => {
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
        const {$api} = useNuxtApp()
        const {joueurs, setJoueurs} = useJoueursStore()
        const {poules, setPoules} = usePoulesStore()
        const {stades, setStades} = useStadesStore()
        const {matchs, setMatchs} = useMatchsStore()
        const {tableaux, setTableaux} = useTableauxStore()
        const response = await $api.get<Tournoi>(`/tournois/${id}`)
        if (response) {
            tournoiActif.value = response.data
            localStorage.setItem('tournoiActifId', String(id))
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
        }
    }

    const initTournoiActif = async () => {
        const tournoiActifId = localStorage.getItem('tournoiActifId')
        if (tournoiActifId) {
            await setActif(parseInt(tournoiActifId))
        }
        // If even after the first init there is still no tournament, we move back to the list
        if (!tournoiActif.value) {
            navigateTo({name: 'Liste_Tournois'})
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
