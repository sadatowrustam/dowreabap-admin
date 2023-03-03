export default ({ $axios }, inject) => {
  inject('returnItemFirstImage', (item) => {
    if (item?.images?.length) {
      return $axios.defaults.baseURL + item.images[0]?.url
    }
  })

  inject('returnItemImage', (image) => {
    if (!image) return null

    return $axios.defaults.baseURL + image.url
  })
}
