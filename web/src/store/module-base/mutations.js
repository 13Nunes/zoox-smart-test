const SET_LAST_JWT_CHECK = (state, data) => {
  state.lastJwtCheck = data
}

const SET_IS_LOADING = (state, data) => {
  state.isLoading = data
}

const SET_ACCOUNT_SELECTED = (state, data) => {
  state.accountSelected = data
}

const SET_LANG_SELECTED = (state, data) => {
  state.langSelected = data
}

const SET_PRODUCTS_SELECTED = (state, data) => {
  state.productsSelected = data
}

const SET_PAYMENT_TYPES = (state, data) => {
  state.paymentTypes = data
}

export {
  SET_LAST_JWT_CHECK,
  SET_IS_LOADING,
  SET_ACCOUNT_SELECTED,
  SET_LANG_SELECTED,
  SET_PRODUCTS_SELECTED,
  SET_PAYMENT_TYPES
}
