export const state = () => ({
  seller: [],
  count:0
})

export const mutations = {
  SET_GIFTS(state, gift) {
    state.seller = gift.seller
    state.count = gift.count
  },
}

export const actions = {
  async fetchSellers({ commit },obj) {
    // const products= require('~/assets/data/product.json');
    const { data } = await this.$axios.get(`/admin/seller?offset=${obj.offset}&limit=${obj.limit}`);
    commit('SET_GIFTS', data);
  },
}

export const getters = {
  seller(state) {
    return state.seller
  },
  count(state){
    return state.count
  }
}