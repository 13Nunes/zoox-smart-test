<template>
  <q-layout view="lhh lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-primary text-white dark">
        <q-btn flat dense round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu" aria-label="Menu"
        />

        <q-toolbar-title>
          <span v-html="$t('core.title')" class="desktop-only"></span>
        </q-toolbar-title>

        <q-separator dark vertical inset class="q-mx-xs" />

        <q-btn-dropdown color="primary" flat stretch text-color="white">
          <template v-slot:label>
            <div class="row items-center no-wrap">
              <template v-if="lang === 'pt-br'">
                <q-avatar>
                  <country-flag country='br' size='normal'/>
                </q-avatar>
              </template>
              <template v-if="lang === 'en-us'">
                <q-avatar>
                  <country-flag country='us' size='normal'/>
                </q-avatar>
              </template>
            </div>
          </template>
          <q-list>
            <q-item clickable v-close-popup @click="setSelectedLang('pt-br')">
              <q-item-section avatar>
                <country-flag country='br' size='normal'/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Português</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="setSelectedLang('en-us')">
              <q-item-section avatar>
                <country-flag country='us' size='normal'/>
              </q-item-section>
              <q-item-section>
                <q-item-label>English</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator />
          </q-list>
        </q-btn-dropdown>

        <q-separator dark vertical inset class="q-mx-xs" />
        <q-btn flat round dense icon="mail_outline" class="q-mr-xs">
          <q-badge floating color="red">1</q-badge>
        </q-btn>
        <q-btn flat round dense icon="notification_important" class="q-mr-xs">
          <q-badge floating color="red">2</q-badge>
        </q-btn>

        <q-separator dark vertical inset class="q-mx-xs" />

        <q-btn-dropdown color="primary" flat stretch text-color="white">
          <template v-slot:label>
            <div class="row items-center no-wrap">
              <div class="q-pr-sm text-center text-white desktop-only">
                {{ userFullName }}
              </div>
              <q-avatar v-if="false">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png">
              </q-avatar>
            </div>
          </template>
          <q-list>
            <q-item clickable v-close-popup v-if="false">
              <q-item-section avatar>
                <q-icon color="primary" name="person" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ $t('core.myProfile')}}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup to="/userPreferences" v-if="false">
              <q-item-section avatar>
                <q-icon color="primary" name="settings_applications" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ $t('core.preferences')}}</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup @click="logout">
              <q-item-section avatar>
                <q-icon color="primary" name="exit_to_app" />
              </q-item-section>{{ $t('core.logout')}}
              <q-item-section>
                <q-item-label></q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
        v-model="leftDrawerOpen"
        overlay
        :width="300"
        :breakpoint="400"
        bordered
        content-class="bg-grey-3"
      >
        <q-scroll-area style="height: calc(100% - 130px); margin-top: 130px; border-right: 1px solid #ddd">
          <q-list padding>
            <q-item clickable v-ripple to="/dashboard">
              <q-item-section avatar><q-icon name="dashboard" /></q-item-section>
              <q-item-section>{{ $t('core.menu.dashboard')}}</q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/states">
              <q-item-section avatar><q-icon name="view_compact" /></q-item-section>
              <q-item-section>{{ $t('core.menu.states')}}</q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/cities">
              <q-item-section avatar><q-icon name="view_comfy" /></q-item-section>
              <q-item-section>{{ $t('core.menu.cities')}}</q-item-section>
            </q-item>

            <q-separator v-if="false" />

            <q-item clickable v-ripple to="/settings" v-if="false">
              <q-item-section avatar><q-icon name="settings_applications" /></q-item-section>
              <q-item-section>{{ $t('core.menu.settings')}}</q-item-section>
            </q-item>

          </q-list>
        </q-scroll-area>

        <div class="absolute-top q-pa-sm" style="height: 130px; background-color: #666">
          <q-btn flat color="primary" class="float-right text-white" round icon="close" size="sm" @click="leftDrawerOpen = false" />
          <img alt="Zoox logo" src="~assets/logo-login.png" style="max-width: 90%;">
        </div>
      </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import CountryFlag from 'vue-country-flag'

export default {
  name: 'DefaultPanelLayout',
  components: {
    CountryFlag
  },
  data () {
    return {
      leftDrawerOpen: false,
      lang: this.$i18n.locale,
      langOptions: [
        { value: 'en-us', label: 'English' },
        { value: 'pt-br', label: 'Português' }
      ],
      userFullName: null
    }
  },
  watch: {
    lang (lang) {
      this.$i18n.locale = lang
    }
  },
  methods: {
    logout () {
      this.openDialog(this.$t('generic.confirm'), this.$t('messages.logoutQuestion'), 'info').onOk(() => {
        localStorage.removeItem('zoox:token')
        this.reLogin()
      })
    },
    setSelectedLang (langCode) {
      this.lang = langCode
      this.$store.commit('Base/SET_LANG_SELECTED', langCode)
    }
  },
  created () {
    this.userFullName = this.getJwtPayload(localStorage['zoox:token']).uname
    let langCode = this.getJwtPayload(localStorage['zoox:token']).uplang

    // Store user preferences
    this.$store.commit('Base/SET_LANG_SELECTED', langCode)

    // Menu lang
    this.lang = langCode
  }
}
</script>
