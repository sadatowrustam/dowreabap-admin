export const state = () => ({
  orders: [],
  count:0,
})

export const mutations = {
  SET_ORDERS(state, orders) {
    state.orders = orders.orders;
    state.count = orders.count
    
    for(let i = 0; i<state.orders.length; i++){
      const len = `${state.orders[i].id}`.length;
      if(len<4){
        for(let j = 0; j<4-len; j++){
          state.orders[i].id = `0${state.orders[i].id}`
        }
      }
    }
  },
}

export const actions = {
  async fetchOrders({ commit },obj) {
    const { data } = await this.$axios.get(`/admin/orders?offset=${obj.offset}&limit=${obj.limit}&keyword=${obj.keyword}&status=${obj.status || ''}`);
    // const orders= require('~/assets/data/order.json');
    commit('SET_ORDERS', data);
  },
}

export const getters = {
  orders(state) {
    return state.orders
  },
  count(state){
    return state.count
  }
}