import type {Joueur} from "~/types/Joueur";
import {usePoulesStore} from "~/store/poules_store";

// export const useJoueursStore2 = defineStore('joueurs', {
//     state: () => ({
//         joueurs: [] as Joueur[],
//         joueurFictif: {} as Joueur,
//         joueurEnAttente: {} as Joueur
//     }),
//     getters: {
//         getJoueursSansPoules: (state) => {
//             return state.joueurs.filter(j => !j.poule_id)
//         },
//         getJoueurParPoule: (state) => (pouleId: number) => {
//             return state.joueurs.filter(j => j.poule_id === pouleId)
//         },
//         getAdversairesValides: (state) => (joueurId: number, pouleId: number) => {
//             const joueur = state.joueurs.find(j => j.id === joueurId);
//             if (!joueur) return [];
//
//             const adversairesJoues = new Set(
//                 joueur.matchs.map(m =>
//                     m.joueur1_id === joueur.id ? m.joueur2_id : m.joueur1_id
//                 )
//             );
//
//             return state.joueurs.filter(j =>
//                 // we remove the current selected player
//                 j.id !== joueurId &&
//                 // we only take player in the same group
//                 j.poule_id === pouleId &&
//                 // we remove the previous opponents
//                 !adversairesJoues.has(j.id!) &&
//                 // we remove player that have a match in progress
//                 !j.matchs.some(m => m.statut === 'en_cours')
//             );
//         },
//         getJoueursDisponiblesDansPoule: (state) => (pouleId: number) => {
//             const poulesStore = usePoulesStore()
//             const poule = poulesStore.getPoule(pouleId)
//             return state.joueurs.filter(j =>
//                 j.poule_id === pouleId &&
//                 !j.matchs.some(m => m.statut === 'en_cours') &&
//                 j.matchs.length < poule!.joueurs.length - 1
//             );
//         },
//         getJoueursSansTableau: (state) => (pouleId: number) => {
//             return state.joueurs.filter(j =>
//                 j.poule_id === pouleId &&
//                 j.tableau_final_id === null
//             );
//         }
//     },
//     actions: {
//         setJoueurs(joueurs: Joueur[]) {
//             this.joueurs = joueurs;
//         },
//         async createJoueur(joueur: Partial<Joueur>) {
//             const {$api} = useNuxtApp()
//             const nouveauJoueur = await $api.post<Joueur>('/joueurs', joueur)
//             this.joueurs.push(nouveauJoueur!.data)
//         },
//         async editJoueur(joueur: Partial<Joueur>) {
//             const {$api} = useNuxtApp()
//             const poulesStore = usePoulesStore()
//             const poule = poulesStore.getPoule(joueur.poule_id!)
//             if (poule) {
//                 const joueurAModifier = poule.joueurs.find(j => j.id === joueur.id)
//                 if (joueurAModifier && !poule.joueurs.map(j => j.id).includes(joueur.id)) {
//                     poule.joueurs.push(joueurAModifier)
//                 }
//             }
//             const joueurModifie = await $api.patch<Joueur>(`/joueurs/${joueur.id}`, {
//                 nom: joueur.nom,
//                 poule_id: joueur.poule_id === undefined ? null : joueur.poule_id,
//                 tournoi_id: joueur.tournoi_id
//             })
//             if (joueurModifie) {
//                 this.joueurs = this.joueurs.map(j => j.id === joueur.id ? joueurModifie.data : j)
//             }
//         },
//         async inscrirePhaseFinale(joueur: Joueur, tableau_id: number) {
//             const {$api} = useNuxtApp()
//             const joueurModifie = await $api.patch<Joueur>(`/joueurs/${joueur.id}`, {
//                 tableau_final_id: tableau_id
//             })
//             if (joueurModifie) {
//                 this.joueurs = this.joueurs.map(j => j.id === joueur.id ? joueurModifie.data : j)
//             }
//         },
//         async desinscrireJoueur(joueur: Joueur) {
//             const {$api} = useNuxtApp()
//             const poulesStore = usePoulesStore()
//             await $api.patch<Joueur>(`/joueurs/${joueur.id}`, {
//                 nom: joueur.nom,
//                 poule_id: null,
//                 tournoi_id: joueur.tournoi_id
//             })
//             const poule = poulesStore.getPoule(joueur.poule_id!)
//             if (poule) {
//                 poule.joueurs = poule.joueurs.filter(j => j.id !== joueur.id)
//             }
//             this.joueurs = this.joueurs.map(j => {
//                 return j.id === joueur.id ? {...joueur, poule_id: undefined} : j
//             })
//         },
//         async deleteJoueur(id: number) {
//             const {$api} = useNuxtApp()
//             await $api.delete<Joueur>(`/joueurs/${id}`)
//             this.joueurs = this.joueurs.filter(t => t.id !== id)
//         },
//     }
// });

export const useJoueursStore = () => {
    const joueurs = useState<Joueur[]>('joueurs', () => [])
    const joueurFictif = useState<Joueur | {}>('joueurFictif', () => {
        return {}
    })
    const joueurEnAttente = useState<Joueur | {}>('joueurEnAttente', () => {
        return {}
    })

    const getJoueursSansPoules = () => joueurs.value.filter(j => !j.poule_id)

    const getJoueurParPoule = (pouleId: number) => joueurs.value.filter(j => j.poule_id === pouleId)

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
        const poulesStore = usePoulesStore()
        const poule = poulesStore.getPoule(pouleId)
        return joueurs.value.filter(j =>
            j.poule_id === pouleId &&
            !j.matchs.some(m => m.statut === 'en_cours') &&
            j.matchs.length < poule!.joueurs.length - 1
        );
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
        const {$api} = useNuxtApp()
        const nouveauJoueur = await $api.post<Joueur>('/joueurs', joueur)
        joueurs.value.push(nouveauJoueur!.data)
    }

    const editJoueur = async (joueur: Partial<Joueur>) => {
        const {$api} = useNuxtApp()
        const poulesStore = usePoulesStore()
        const poule = poulesStore.getPoule(joueur.poule_id!)
        if (poule) {
            const joueurAModifier = poule.joueurs.find(j => j.id === joueur.id)
            if (joueurAModifier && !poule.joueurs.map(j => j.id).includes(joueur.id)) {
                poule.joueurs.push(joueurAModifier)
            }
        }
        const joueurModifie = await $api.patch<Joueur>(`/joueurs/${joueur.id}`, {
            nom: joueur.nom,
            poule_id: joueur.poule_id === undefined ? null : joueur.poule_id,
            tournoi_id: joueur.tournoi_id
        })
        if (joueurModifie) {
            joueurs.value = joueurs.value.map(j => j.id === joueur.id ? joueurModifie.data : j)
        }
    }

    const inscrirePhaseFinale = async (joueur: Joueur, tableau_id: number) => {
        const {$api} = useNuxtApp()
        const joueurModifie = await $api.patch<Joueur>(`/joueurs/${joueur.id}`, {
            tableau_final_id: tableau_id
        })
        if (joueurModifie) {
            joueurs.value = joueurs.value.map(j => j.id === joueur.id ? joueurModifie.data : j)
        }
    }

    const desinscrireJoueur = async (joueur: Joueur) => {
        const {$api} = useNuxtApp()
        const poulesStore = usePoulesStore()
        await $api.patch<Joueur>(`/joueurs/${joueur.id}`, {
            nom: joueur.nom,
            poule_id: null,
            tournoi_id: joueur.tournoi_id
        })
        const poule = poulesStore.getPoule(joueur.poule_id!)
        if (poule) {
            poule.joueurs = poule.joueurs.filter(j => j.id !== joueur.id)
        }
        joueurs.value = joueurs.value.map(j => {
            return j.id === joueur.id ? {...joueur, poule_id: undefined} : j
        })
    }

    const deleteJoueur = async (id: number) => {
        const {$api} = useNuxtApp()
        await $api.delete<Joueur>(`/joueurs/${id}`)
        joueurs.value = joueurs.value.filter(t => t.id !== id)
    }

    return {
        joueurs,
        joueurFictif,
        joueurEnAttente,
        desinscrireJoueur,
        editJoueur,
        deleteJoueur,
        setJoueurs,
        inscrirePhaseFinale,
        getJoueursSansPoules,
        getJoueurParPoule,
        getAdversairesValides,
        getJoueursDisponiblesDansPoule,
        createJoueur,
        getJoueursSansTableau
    }
}