export default ({ redirect }, inject) => {
  inject('redirect', (url) => {
    console.log(url)
    return redirect(url)
  })
}
