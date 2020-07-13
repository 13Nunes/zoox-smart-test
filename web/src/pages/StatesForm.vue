<template>
  <q-page class="flex items-start row q-pa-md">
    <container-elastic>
      <q-card>
        <q-toolbar class="bg-grey-4">
          <q-toolbar-title class="flex justify-between items-center">
            <span>
              <q-icon name="assignment_ind" />
              {{ $t('states.state') }}
            </span>
            <span class="text-subtitle2 text-grey-6">ID: {{ form._id }}</span>
          </q-toolbar-title>
        </q-toolbar>
        <div class="row gutter-sm q-ma-md">
          <q-input class="col-5" v-model="form.title" :label="$t('states.state')" :error="$v.form.title.$error" />
          <div class="col-2" />
          <q-input class="col-5" v-model="form.code" :label="$t('states.code')" :error="$v.form.code.$error" />
        </div>
        <q-card-actions align="center" class="q-pa-md">
          <q-btn color="warning" icon="cancel" :label="$t('generic.cancel')" flat @click="cancel" />
          <q-btn color="positive" icon="save" :label="$t('generic.save')" flat @click="save" />
        </q-card-actions>
      </q-card>
    </container-elastic>
  </q-page>
</template>

<script>
import ContainerElastic from 'components/ContainerElastic'
import { mapActions, mapState } from 'vuex'
import { required, maxLength } from 'vuelidate/lib/validators'

export default {
  name: 'StatesForm',
  components: {
    ContainerElastic
  },
  data: () => ({
    form: {}
  }),
  validations: {
    form: {
      code: { required, maxLength: maxLength(2) },
      title: { required, maxLength: maxLength(64) }
    }
  },
  computed: {
    ...mapState('Base', ['langSelected']),
    ...mapState('State', ['stateObj'])
  },
  methods: {
    ...mapActions('State', ['saveState']),
    save () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$q.notify(this.$t('messages.validationError'))
      } else {
        let payload = this.form

        this.saveState(payload).then(() => {
          this.$router.push('/states')
        }).catch(err => {
          // Check the error type because not always need to relogin
          if (this.isJwtError(err)) this.reLogin(err.code)
        })
      }
    },
    cancel () {
      this.openDialog(this.$t('generic.warning'), this.$t('generic.editWarning'), 'warning').onOk(() => {
        this.$router.replace('/states')
      })
    }
  },
  mounted () {
    if (this.needJwtCheck) this.checkJwt()
    this.form = Object.assign({}, this.stateObj)
  }
}
</script>

<style>
</style>
