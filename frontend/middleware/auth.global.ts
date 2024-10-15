export default defineNuxtRouteMiddleware((to) => {
  const authToken = useCookie('auth-token')
  const alert = useToast()
  const publicRoutes = ['/connexion', '/inscription', '/']

  if (!authToken.value && !publicRoutes.includes(to.path)) {
    alert.add({
      title: 'Vous devez être connecté pour consulter cette page',
      color: 'red'
    })
    return navigateTo({name: 'Connexion'})
  }
})