export const actions = {
  async nuxtServerInit({ dispatch }) {
    const adminToken = this.$cookies.get('admin-token')
    if (adminToken) {
      dispatch('admin/setAdminToken', adminToken)
      await dispatch('fetchData')
    }
  },

  async fetchData({ dispatch }) {
    await dispatch('orders/fetchOrders',{limit:10,offset:0})
    // await dispatch('language/fetchLanguage')
    await dispatch('products/fetchProducts',{limit:10,offset:0})
    await dispatch('kategory/fetchkategory')
    // await dispatch('brand/fetchbrand',{limit:10,offset:0})
    await dispatch('banner/fetchBanners',{limit:10,offset:0})
    // await dispatch('gifts/fetchGifts',{limit:10,offset:0})
    await dispatch('sellers/fetchSellers',{limit:10,offset:0})
    // await dispatch('chats/fetchChats');
    // await dispatch('statistica/fetchStatic');
  },
}
