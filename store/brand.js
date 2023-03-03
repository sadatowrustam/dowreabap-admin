export const state = () => ({
  brand: '',
  count:0,
})

export const mutations = {
  SET_BRAND(state, brand) {
    state.brand = brand.rows,
    state.count = brand.count
  },
}

export const actions = {
  async fetchbrand({ commit },obj) {
    // const data= require('~/assets/data/product.json');
    const { data } = await this.$axios.get(`/admin/brands?limit=${obj.limit}&offset=${obj.offset}&name=${obj.name}&bool=${obj.bool}&keyword=${obj.keyword}`);
    commit('SET_BRAND', data);
  },
}

export const getters = {
  brand(state) {
    return state.brand
  },
  brandCount(state) {
    return state.count
  },
  brandNames(state){
    const names = {
      name:[],
      id:[]
    }
    for(var i = 0; i< state.brand.length; i++){
      names.name.push(state.brand[i].name_tm)
      names.id.push(state.brand[i].brand_id)
    }
    return names;
  }
}