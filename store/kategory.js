export const state = () => ({
  kategory: ''
})

export const mutations = {
  SET_KATEGORY(state, kategory) {
    state.kategory = kategory
  },
}

export const actions = {
  async fetchkategory({ commit},keyword) {
    const { data } = await this.$axios.get(`/admin/categories?keyword=${keyword}`)
    commit('SET_KATEGORY', data);
  },
}

export const getters = {
  kategory(state) {
    return state.kategory
  },
  kategoryNames(state){
    const names = {
      name:[],
      id:[]
    }
    for(var i = 0; i< state.kategory.length; i++){
      names.name.push(state.kategory[i].name_tm)
      names.id.push(state.kategory[i].category_id)
    }
    return names;
  }
}