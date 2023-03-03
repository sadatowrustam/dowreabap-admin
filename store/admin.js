export const state = () => ({
  admin: null,
  adminToken: null
})

export const mutations = {
  SET_ADMIN(state, admin) {
    state.admin = admin
  },

  SET_ADMIN_TOKEN(state, adminToken) {
    state.adminToken = adminToken
  }
}

export const actions = {
  setAdmin({commit}, admin) {
    commit("SET_ADMIN", admin)
  },

  setAdminToken({commit}, adminToken) {
    this.$axios.setHeader('Authorization', `Bearer ${adminToken}`)
    commit("SET_ADMIN_TOKEN", adminToken)
  }
}

export const getters = {
  admin(state) {
    return state.admin
  },

  adminToken(state) {
    return state.adminToken
  }
}
