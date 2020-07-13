const getCityList = ({ state, commit }, payload) => {
  return state.axios.get(`cities`).then(res => {
    commit('SET_CITY_LIST', res.data.data)
  })
}

const saveCity = ({ state, commit }, payload) => {
  const request = {
    title: payload.title,
    stateId: payload.state._id
  }

  if (payload._id) {
    return state.axios.put(`cities/${payload._id}`, request).then(res => {
      commit('SET_CITY', payload)
      commit('UPD_CITYLIST', payload)
    })
  } else {
    return state.axios.post(`cities`, request).then(res => {
      commit('SET_CITY', payload)
      commit('UPD_CITY_LIST', payload)
    })
  }
}

const deleteCity = ({ state, commit }, payload) => {
  return state.axios.delete(`cities/${payload._id}`, { data: payload }).then(res => {
    commit('DEL_CITY', payload)
  })
}

export {
  getCityList,
  saveCity,
  deleteCity
}
