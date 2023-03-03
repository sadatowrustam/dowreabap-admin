export const state = () => ({
  banner: [],
})

export const mutations = {
  BANNER(state, banner) {
    state.banner = banner
  },
}

export const actions = {
  async fetchStatic({ state, commit }) {
    // const banner = require(`../assets/data/category.json`)
    const { data } = await this.$axios.get(`/public/static/statistics`);
    commit('BANNER', data)
  },
}

export const getters = {
  banner(state) {
    return state.banner
  },
}
