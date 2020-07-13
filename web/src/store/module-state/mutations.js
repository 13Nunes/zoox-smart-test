const SET_STATE = (state, data) => {
  state.stateObj = data
}

const SET_STATE_LIST = (state, data) => {
  state.stateLst = data
}

const UPD_STATE_LIST = (state, data) => {
  let idx = state.stateLst.findIndex(x => x.stateId === data.stateId)
  if (idx === -1) {
    state.stateLst.push(data)
  } else {
    state.stateLst[idx] = data
  }
}

const DEL_STATE = (state, data) => {
  let idx = state.stateLst.findIndex(x => x.stateId === data.stateId)
  state.stateLst.splice(idx, 1)
  SET_STATE(state, data)
}

export {
  SET_STATE,
  SET_STATE_LIST,
  UPD_STATE_LIST,
  DEL_STATE
}
