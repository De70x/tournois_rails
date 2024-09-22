import {useTournoisStore} from "~/store/tournois_store";

export default defineNuxtRouteMiddleware((to, from) => {
  const {tournoiActif, initTournoiActif} = useTournoisStore()
  const disabledPaths = ['/connexion', '/deconnexion', '/inscription', 'tirageAuSort']

  if (to.meta.authFailed) {
    return
  }

  if (!disabledPaths.includes(from.path) && !tournoiActif.value) {
    initTournoiActif().then(() => {
      if (tournoiActif.value) {
        navigateTo(to.path)
      } else {
        navigateTo({name: 'Liste_Tournois'})
      }
    }).catch((e) => {
      console.error(e)
      navigateTo({name: 'Connexion'})
    })
  }

});