import type {Joueur} from "~/types/Joueur";
import {JoueurTypes} from "~/types/Joueur";
import {usePoulesStore} from "~/stores/usePoulesStore";
import type {ComputedRef} from "vue";
import type {Api} from "~/plugins/api";

export const useJoueursStore = (api: Api) => {
  const joueurs = useState<Joueur[]>('joueurs', () => [])
  const joueurFictif = useState<Joueur | undefined>('joueurFictif', () => {
    return joueurs.value.find(j => j.type_joueur === JoueurTypes.FICTIF)
  })
  const joueurEnAttente = useState<Joueur | undefined>('joueurEnAttente', () => {
    return joueurs.value.find(j => j.type_joueur === JoueurTypes.ATTENTE)
  })

  const getJoueurById: ComputedRef<(id: number) => Joueur | undefined> = computed(() => (id: number) => joueurs.value.find(j => j.id === id))

  const getJoueursSansPoules = () => joueurs.value.filter(j => !j.poule_id && j.type_joueur === JoueurTypes.CLASSIQUE)

  const getJoueursParPoule = (pouleId: number) => joueurs.value.filter(j => j.poule_id === pouleId)

  const getAdversairesValides = (joueurId: number, pouleId: number) => {
    const joueur = joueurs.value.find(j => j.id === joueurId);
    if (!joueur) return [];

    const adversairesJoues = new Set(
      joueur.matchs.map(m =>
        m.joueur1_id === joueur.id ? m.joueur2_id : m.joueur1_id
      )
    );

    return joueurs.value.filter(j =>
      // we remove the current selected player
      j.id !== joueurId &&
      // we only take player in the same group
      j.poule_id === pouleId &&
      // we remove the previous opponents
      !adversairesJoues.has(j.id!) &&
      // we remove player that have a match in progress
      !j.matchs.some(m => m.statut === 'en_cours')
    );
  }

  const getJoueursDisponiblesDansPoule = (pouleId: number) => {
    const poulesStore = usePoulesStore(api)
    const poule = poulesStore.getPoule(pouleId)
    return joueurs.value.filter(j =>
      j.poule_id === pouleId &&
      !j.matchs.some(m => m.statut === 'en_cours') &&
      j.matchs.length < poule!.joueurs.length - 1
    ).sort(triParNombreDeMatchs);
  }

  const getJoueursParTableau = (tabId: number) => {
    return joueurs.value.filter(j => j.tableau_final_id === tabId)
  }

  const getJoueursSansTableau = (pouleId: number) => {
    return joueurs.value.filter(j =>
      j.poule_id === pouleId &&
      j.tableau_final_id === null
    );
  }

  const setJoueurs = (nouveauJoueurs: Joueur[]) => {
    joueurs.value = nouveauJoueurs;
  }

  const createJoueur = async (joueur: Partial<Joueur>) => {
    const nouveauJoueur = await api.post<Joueur>('/joueurs', joueur)
    if (nouveauJoueur) {
      joueurs.value.push(nouveauJoueur!.data)
    }
  }

  const editJoueur = async (joueur: Partial<Joueur>) => {
    const poulesStore = usePoulesStore(api)
    const poule = poulesStore.getPoule(joueur.poule_id!)
    if (poule) {
      const joueurAModifier = poule.joueurs.find(j => j.id === joueur.id)
      if (joueurAModifier && !poule.joueurs.map(j => j.id).includes(joueur.id)) {
        poule.joueurs.push(joueurAModifier)
      }
    }
    const joueurModifie = await api.patch<Joueur>(`/joueurs/${joueur.id}`, {
      nom: joueur.nom,
      poule_id: joueur.poule_id === undefined ? null : joueur.poule_id,
      tournoi_id: joueur.tournoi_id
    })
    updateJoueurInStore(joueurModifie?.data)
  }

  const inscrirePhaseFinale = async (joueur: Joueur, tableau_id: number) => {
    const joueurModifie = await api.patch<Joueur>(`/joueurs/${joueur.id}`, {
      tableau_final_id: tableau_id
    })
    updateJoueurInStore(joueurModifie?.data)
  }

  const desinscrireJoueur = async (joueur: Joueur) => {
    const poulesStore = usePoulesStore(api)
    await api.patch<Joueur>(`/joueurs/${joueur.id}`, {
      nom: joueur.nom,
      poule_id: null,
      tournoi_id: joueur.tournoi_id
    })
    const poule = poulesStore.getPoule(joueur.poule_id!)
    if (poule) {
      poule.joueurs = poule.joueurs.filter(j => j.id !== joueur.id)
    }
    updateJoueurInStore({...joueur, poule_id: undefined})
  }

  const deleteJoueur = async (id: number) => {
    await api.delete<Joueur>(`/joueurs/${id}`)
    joueurs.value = joueurs.value.filter(t => t.id !== id)
  }

  const ajouterTag = async (joueur: Partial<Joueur>, tag_id: number) => {
    const joueurModifie = await api.patch<Joueur>(`/joueurs/${joueur.id}`, {tag_id})
    updateJoueurInStore(joueurModifie?.data)
  }

  const updateJoueurInStore = (joueurModifie: Joueur | undefined) => {
    if (joueurModifie) {
      joueurs.value = joueurs.value.map(j => {
        return j.id === joueurModifie.id ? joueurModifie : j
      })
    }
  }

  const triParNombreDeMatchs = (j1: Joueur, j2: Joueur) => {
    return j1.nb_matchs - j2.nb_matchs
  }

  return {
    joueurs,
    joueurFictif,
    joueurEnAttente,
    desinscrireJoueur,
    editJoueur,
    getJoueurById,
    deleteJoueur,
    setJoueurs,
    inscrirePhaseFinale,
    getJoueursSansPoules,
    getJoueursParPoule,
    getAdversairesValides,
    getJoueursDisponiblesDansPoule,
    createJoueur,
    getJoueursSansTableau,
    getJoueursParTableau,
    ajouterTag
  }
}