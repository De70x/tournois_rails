import {useTournoisStore} from "~/store/tournois_store";

export default defineNuxtRouteMiddleware((to, _from) => {
  const {tournoiActif, initTournoiActif} = useTournoisStore()

  if (!tournoiActif.value) {
    initTournoiActif().then(() => {
      if (tournoiActif.value) {
        navigateTo(to.path)
      } else {
        navigateTo({name: 'Liste_Tournois'})
      }
    })
  }

});