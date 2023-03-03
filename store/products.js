export const state = () => ({
  products: [],
  count:0
})

export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products.products
    state.count = products.count
  },
}

export const actions = {
  async fetchProducts({ commit },obj) {
    // const products= require('~/assets/data/product.json');
    // console.log(obj)
    const { data } = await this.$axios.get(`/admin/products?offset=${obj.offset}&limit=${obj.limit}&keyword=${obj.keyword}&isActive=${obj.isActive}`)
    // console.log(data);
    commit('SET_PRODUCTS', data);
  },
}

export const getters = {
  products(state) {
    return state.products
  },
  productsCount(state){
    return state.count
  }
}