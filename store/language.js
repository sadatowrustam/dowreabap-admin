export const state = () => ({
  language: ''
})

export const mutations = {
  SET_LANGUAGE(state, language) {
    state.language = language
  },
}

export const actions = {
  async fetchLanguage({ commit },lang) {
    let language = '';
    lang ? language = lang : language = this.$i18n.locale
    
    commit('SET_LANGUAGE', language);
  },
}

export const getters = {
  language(state) {
    return state.language
  },
}