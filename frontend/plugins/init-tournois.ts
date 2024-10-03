import { useTournoisStore } from '~/stores/useTournoisStore'

export default defineNuxtPlugin(async (nuxtApp) => {
  const {$api} = useNuxtApp()
  const tournoiStore = useTournoisStore($api)
  const route = useRoute()

  if (!tournoiStore.tournoiActif) {
    await tournoiStore.initTournoiActif()

    if (!tournoiStore.tournoiActif && !['Connexion', 'Inscription', 'Liste_Tournois'].includes(route.name as string)) {
      navigateTo('/tournois')
    }
  }
})