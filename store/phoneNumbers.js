export const state = () => ({
  products: [],
  count:0
})

export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products.orders
    state.count = products.count
  },
}

export const actions = {
  async fetchPhones({ commit },obj) {
    // const products= require('~/assets/data/product.json');
    // console.log(obj)//admin/orders/all-phones
    const { data } = await this.$axios.get(`/admin/orders/all-phones?offset=${obj.offset}&limit=${obj.limit}&keyword=${obj.keyword}`)
    // console.log(data);
    commit('SET_PRODUCTS', data);
  },
}

export const getters = {
  phones(state) {
    return state.products
  },
  phonesCount(state){
    return state.count
  }
}