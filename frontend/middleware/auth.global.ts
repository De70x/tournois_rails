import {useAuthStore} from "~/store/auth_store";

export default defineNuxtRouteMiddleware((to, from) => {
  const {authToken} = useAuthStore()
  const disabledPaths = ['/connexion', '/deconnexion', '/inscription', 'tirageAuSort']

  to.meta.authFailed = true

  if (!disabledPaths.includes(to.path)) {
    if (!authToken.value) {
      navigateTo({name: 'Connexion'})
    }
    else{
      to.meta.authFailed = false
      navigateTo(to)
    }
  }

});