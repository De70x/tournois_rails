import type {Tableau} from "~/types/Tableau";
import type {Joueur} from "~/types/Joueur";

export const useTableauxStore = () => {
    const tableaux = useState<Tableau[]>('tableaux', () => [])
    const tableauSelectionne = useState<Tableau | null>('tableauSelectionne', () => null)
    const joueursSelectionnes = useState<Joueur[]>('joueursSelectionnes', () => [])

    const setTableaux = (nouveauxTableaux: Tableau[]) => {
        tableaux.value = nouveauxTableaux
    }

    const retirerJoueur = (joueur: Joueur) => {
        joueursSelectionnes.value = joueursSelectionnes.value.filter((j: Joueur) => j.id !== joueur.id)
    }
    const ajouterJoueur = (joueur: Joueur) => {
        if (!joueursSelectionnes.value.some(j => j.id === joueur.id)) {
            joueursSelectionnes.value.push(joueur)
        }
    }
    const createTableau = async (tableau: Tableau) => {
        const {$api} = useNuxtApp()
        const nouveauTableau = await $api.post<Tableau>('/tableau_finals', tableau)
        tableaux.value.push(nouveauTableau!.data)
    }
    const editTableau = async (tableau: Partial<Tableau>) => {
        const {$api} = useNuxtApp()
        await $api.patch<Tableau>(`/tableau_finals/${tableau.id}`, {nom: tableau.nom})
        tableaux.value = tableaux.value.map(p => p.id === tableau.id ? {
            ...p,
            nom: tableau.nom!
        } : p)
    }

    const deleteTableau = async (id: number) => {
        const {$api} = useNuxtApp()
        await $api.delete<Tableau>(`/tableau_finals/${id}`)
        tableaux.value = tableaux.value.filter(p => p.id !== id)
    }

    return {
        tableaux,
        tableauSelectionne,
        joueursSelectionnes,
        setTableaux,
        createTableau,
        editTableau,
        deleteTableau,
        retirerJoueur,
        ajouterJoueur,
    }
}
