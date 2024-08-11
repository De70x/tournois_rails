import type {Tableau} from "~/types/Tableau";
import type {Joueur} from "~/types/Joueur";

export const useTableauxStore = defineStore('tableaux', {
    state: () => ({
        tableaux: [] as Tableau[],
        tableauSelectionne: {} as Tableau,
        joueursSelectionnes: [] as Joueur[]
    }),
    actions: {
        setTableaux(tableaux: Tableau[]) {
            this.tableaux = tableaux;
        },
        retirerJoueur(joueur: Joueur) {
            this.joueursSelectionnes = this.joueursSelectionnes.filter((j: Joueur) => j.id !== joueur.id)
        },
        ajouterJoueur(joueur: Joueur) {
            if (!this.joueursSelectionnes.some(j => j.id === joueur.id)) {
                this.joueursSelectionnes.push(joueur)
            }
        },
        async createTableau(tableau: Tableau) {
            const {$api} = useNuxtApp()
            const nouveauTableau = await $api.post<Tableau>('/tableau_finals', tableau)
            this.tableaux.push(nouveauTableau!.data)
        },
        async editTableau(tableau: Partial<Tableau>) {
            const {$api} = useNuxtApp()
            await $api.patch<Tableau>(`/tableau_finals/${tableau.id}`, {nom: tableau.nom})
            this.tableaux = this.tableaux.map(p => p.id === tableau.id ? {
                ...p,
                nom: tableau.nom!
            } : p)
        },
        async deleteTableau(id: number) {
            const {$api} = useNuxtApp()
            await $api.delete<Tableau>(`/tableau_finals/${id}`)
            this.tableaux = this.tableaux.filter(p => p.id !== id)
        }
    }
});
