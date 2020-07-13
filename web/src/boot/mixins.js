import { Dialog } from 'quasar'
import { mapGetters } from 'vuex'

export default ({ Vue }) => {
  Vue.mixin({
    methods: {
      // Opens a Quasar modal dialog
      openDialog (title, message, color, position = 'standard', okcancel = true) {
        return Dialog.create({
          title: title,
          message: message,
          color: color,
          class: 'bg-grey-3',
          position: position,
          preventClose: true,
          ok: true,
          cancel: okcancel
        })
      },
      // Get the decoded payload (content) of a JWT without validate it
      getJwtPayload (token) {
        if (token) {
          let base64Url = token.split('.')[1]
          let base64 = base64Url.replace('-', '+').replace('_', '/')
          return JSON.parse(window.atob(base64))
        } else {
          return null
        }
      },
      // Use a Vuex action to check the if jwt is still valid
      checkJwt () {
        if (!localStorage['zoox:token']) {
          this.reLogin()
        }
      },
      // Check if is an authentication error
      isJwtError (err) {
        return (err.code && err.code.toLowerCase().includes('jwt')) || (err.message && err.message.toLowerCase().includes('jwt'))
      },
      // Redirect to login page
      reLogin (errCode) {
        if (localStorage['zoox:token']) {
          this.$q.notify({ message: this.$t(`apiCodes.${errCode}`), color: 'negative' })
          localStorage.removeItem('zoox:token')
        }
        if (this.$route.path !== '/') this.$router.push('/')
      },
      processError (err, redirectRoute = null, notifyErr = true) {
        if (notifyErr) this.$q.notify(err.code ? this.$t(`apiCodes.${err.code}`) : this.$t(`apiCodes.${err.response.status}`))
        // Check the error type because not always need to relogin
        if (this.isJwtError(err)) {
          this.reLogin(err.code)
        } else if (redirectRoute) {
          this.$router.replace(redirectRoute)
        }
      }
    },
    computed: {
      ...mapGetters('Base', ['needJwtCheck'])
    }
  })
}
