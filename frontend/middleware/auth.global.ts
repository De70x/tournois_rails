export default defineNuxtRouteMiddleware((to) => {
  const authToken = useCookie('auth-token')
  const publicRoutes = ['/connexion', '/inscription', '/']

  if (!authToken.value && !publicRoutes.includes(to.path)) {
    return navigateTo({name: 'Connexion'})
  }
})