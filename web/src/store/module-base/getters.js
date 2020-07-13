const needJwtCheck = state => {
  // Last Jwt check was more than 5 minutes ago
  return (new Date().getTime() - state.lastJwtCheck.getTime()) > 5 * 60000
}

export {
  needJwtCheck
}
