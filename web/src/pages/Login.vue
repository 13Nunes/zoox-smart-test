<template>
  <q-layout view="hHh lpR fFf" class="blue-grey-1">
    <q-page-container>
      <q-page class="flex flex-center" style="background: url(https://source.unsplash.com/1280x720/?lock) no-repeat; background-size: cover;">
        <q-card style="width: 340px;">
          <q-card-section class="flex flex-center q-my-md">
            <img src="~assets/logo-login.png" alt="Logo" style="max-width: 80%">
          </q-card-section>
          <q-card-section>
            <q-form v-if="userStatus === 'A'" autocorrect="off" autocapitalize="off" autocomplete="off" spellcheck="false">
              <div class="q-gutter-y-md">
                <q-input v-model="form.email" type="email" dense flat label="E-mail" :error="$v.form.email.$error">
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
                <q-input v-model="form.password" dense flat :type="isPwd ? 'password' : 'text'" :label="$t('core.password')" :error="$v.form.password.$error">
                  <template v-slot:prepend>
                    <q-icon name="lock" />
                  </template>
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
                <!-- <div class="error" v-if="!$v.form.password.required">Required field</div> -->
                <div class="flex justify-between">
                  <q-checkbox v-model="remember" size="xs" :label="$t('core.remember')" />
                  <q-btn type="a" color="primary" size="sm" flat :label="$t('messages.passwordQuestion')" to="/forgotPassword" />
                </div>
                <q-btn color="primary" class="full-width" label="Entrar" @click="login" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
    <q-footer class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <span class="text-subtitle2">Version 0.0.1</span>
        </q-toolbar-title>
        <span class="text-subtitle2">powered by Fernando Nunes</span>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { required, maxLength, email, sameAs } from 'vuelidate/lib/validators'

export default {
  name: 'Login',
  data: () => ({
    form: {
      email: 'test@zooxsmart.com',
      password: 'test'
    },
    form1: {
      retypePassword: '',
      password: ''
    },
    isPwd: 'text',
    remember: false,
    userStatus: 'A',
    userFullName: ''
  }),
  validations: {
    form: {
      email: { required, maxLength: maxLength(150), email },
      password: { required, maxLength: maxLength(30) }
    },
    form1: {
      password: { required, maxLength: maxLength(30) },
      retypePassword: { required, maxLength: maxLength(30), sameAsPassword: sameAs('password') }
    }
  },
  methods: {
    login () {
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        this.$axios.post('/login', { login: this.form.email, password: this.form.password }).then(res => {
          if (res.data.success === true) {
            localStorage.setItem('zoox:token', res.data.token)
            this.$router.push('dashboard')
          } else {
            this.openDialog(this.$t('core.error'), this.$t(`apiCodes.${res.data.error.code}`), 'negative', 'standard', false)
          }
        }).catch(err => {
          this.openDialog(this.$t('core.error'), this.$t(`apiCodes.${err.response ? err.response.code : err.code}`), 'negative', 'standard', false)
        })
      }
    }
  },
  mounted () {
    this.checkJwt()
  }
}
</script>
