import {useJoueursStore} from "~/stores/useJoueursStore";
import type {Joueur} from "~/types/Joueur";
import {useMatchsStore} from "~/stores/useMatchsStore";
import {MatchStatuses} from "~/types/Match";

const {$api} = useNuxtApp()
const {joueurFictif, joueurEnAttente} = useJoueursStore($api)
const {createMatch, matchs} = useMatchsStore($api)

export const generateBracket = (joueurs: Partial<Joueur>[], idTableau: number) => {
  const nbJoueursNecessaires = nextPowerOfTwo(joueurs.length);
  const nbMatchs = nbJoueursNecessaires / 2;
  const nbTours = Math.log2(nbJoueursNecessaires);

  const tabIndice = getTableauIndices(nbMatchs);

  // premier tour
  for (let i = 0; i < nbMatchs; i++) {
    const j1 = joueurs[i];
    const j2 =
      nbJoueursNecessaires - i - 1 >= joueurs.length
        ? joueurFictif.value
        : joueurs[nbJoueursNecessaires - i - 1];

    createMatch({
      joueur1_id: j1.id,
      joueur2_id: j2?.id,
      phase: 0,
      statut: MatchStatuses.INIT,
      indice: tabIndice[i],
      tableau_final_id: idTableau
    })
  }

  // Les tours suivant n'auront pas de joueurs
  for (let i = 1; i < nbTours; i++) {
    const diviseur = Math.pow(2, i);
    const nbMatchDuTour = nbMatchs / diviseur;
    for (let j = 0; j < nbMatchDuTour; j++) {
      createMatch({
        joueur1_id: joueurEnAttente.value?.id,
        joueur2_id: joueurEnAttente.value?.id,
        phase: i,
        statut: MatchStatuses.INIT,
        indice: j,
        tableau_final_id: idTableau
      })
    }
  }

  // Enfin on qualifie automatiquement les joueurs qui sont contre BYE


};


/**
 * Les joueurs sont triés par score, on va chercher à écarter les meilleurs pour avoir
 * de belles finales, on fait ça pour les 4 premiers, puis on fait du random
 * @param nbMatchs
 */
const getTableauIndices = (nbMatchs: number) => {
  const tabOrdre = [0, nbMatchs - 1, nbMatchs / 4, nbMatchs - nbMatchs / 4 - 1];

  while (tabOrdre.length < nbMatchs) {
    let indiceAleatoire = Math.floor(Math.random() * nbMatchs);

    // tant que l'indice est présent dans le tableau, on tire un autre numéro au sort
    while (tabOrdre.includes(indiceAleatoire)) {
      indiceAleatoire = Math.floor(Math.random() * nbMatchs);
    }

    tabOrdre.push(indiceAleatoire);
  }
  return tabOrdre;
};

const nextPowerOfTwo = (n: number): number => Math.pow(2, Math.ceil(Math.log2(n)));