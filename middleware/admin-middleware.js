export default ({store, $cookies, redirect}) => {
  const user = store.getters['admin/admin'] || $cookies.get('admin')
  if (!user) {
    redirect('/login')
  }
}
