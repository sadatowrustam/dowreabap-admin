export const state = () => ({
  gift: [],
  count:0
})

export const mutations = {
  SET_GIFTS(state, gift) {
    state.gift = gift.rows
    state.count = gift.count
  },
}

export const actions = {
  async fetchGifts({ commit },obj) {
    // const products= require('~/assets/data/product.json');
    const { data } = await this.$axios.get(`/admin/gifts?offset=${obj.offset}&limit=${obj.limit}`)
    commit('SET_GIFTS', data);
  },
}

export const getters = {
  gift(state) {
    return state.gift
  },
  giftCount(state){
    return state.count
  }
}