const SET_CITY = (state, data) => {
  state.cityObj = data
}

const SET_CITY_LIST = (state, data) => {
  state.cityLst = data
}

const UPD_CITY_LIST = (state, data) => {
  let idx = state.cityLst.findIndex(x => x.cityId === data.cityId)
  if (idx === -1) {
    state.cityLst.push(data)
  } else {
    state.cityLst[idx] = data
  }
}

const DEL_CITY = (state, data) => {
  let idx = state.cityLst.findIndex(x => x.cityId === data.cityId)
  state.cityLst.splice(idx, 1)
  SET_CITY(state, data)
}

export {
  SET_CITY,
  SET_CITY_LIST,
  UPD_CITY_LIST,
  DEL_CITY
}
