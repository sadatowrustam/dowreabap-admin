export const state = () => ({
  banner: [],
  count:0
})

export const mutations = {
  SET_BANNERS(state, banner ){
    state.banner = banner.banners

  },
}

export const actions = {
  async fetchBanners({ commit },obj) {
    // const products= require('~/assets/data/product.json');
    const { data } = await this.$axios.get(`/admin/banners?offset=${obj.offset}&limit=${obj.limit}`)
    console.log(data)
    commit('SET_BANNERS', data);
  },
}

export const getters = {
  banner(state) {
    return state.banner
  },
  bannerCount(state){
    return state.count
  }
}