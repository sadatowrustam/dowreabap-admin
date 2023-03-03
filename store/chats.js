export const store = () => ({
  users: [],
})

export const mutations = {
  SET_USERS(store, users) {
    store.users = users
  },
}

export const actions = {
  async fetchChats({ commit }) {
    const { data } = await this.$axios.get('/admin/chats');
    commit('SET_USERS', data);
  },
}

export const getters = {
  users(state) {
    return state.users
  },
}
