<template>
  <q-page class="flex items-start q-pa-md bg-grey-3">
    <container-elastic>
      <div class="row q-pb-md">
        <div class="col">
          <h3 class="text-h5 q-my-none flex items-center">
            <q-icon name="view_compact" /> <span>{{ $t('states.states') }}</span>
          </h3>
        </div>
        <div class="col text-right">
          <q-btn color="primary" :label="$t('generic.add')" icon="add_box" @click="editClick({})"/>
        </div>
      </div>
      <q-card>
        <q-toolbar class="bg-grey-4 q-py-sm">
          <div class="row full-width">
            <div class="col-xs-12 col-sm-9 flex items-center">
              <div v-if="tools">
                <q-btn outline color="primary" dense icon="import_export">
                  <span v-html="$t('generic.export')" class="desktop-only"></span>
                </q-btn>
              </div>
            </div>
            <div class="col-xs-12 col-sm-3 text-right">
              <q-input dense debounce="300" v-model="filter">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </div>
          </div>
        </q-toolbar>
        <q-table
          :data="data"
          :columns="columns"
          :rows-per-page-options="[10, 20, 50, 100]"
          :filter="filter"
          :pagination.sync="pagination"
          :dense="false"
          row-key="id">
          <q-tr slot="body" slot-scope="props" :props="props">
            <q-td key="id" :props="props">
              {{ props.row._id }}
            </q-td>
            <q-td key="title" :props="props">
              {{ props.row.title }}
            </q-td>
            <q-td key="code" :props="props">
              {{ props.row.code }}
            </q-td>
            <q-td key="actions" :props="props">
              <q-btn flat color="positive" icon="edit" @click="editClick(props.row)"/>
              <q-btn flat color="negative" icon="delete" @click="deleteClick(props.row)"/>
            </q-td>
          </q-tr>
        </q-table>
      </q-card>
    </container-elastic>
  </q-page>
</template>

<script>
import ContainerElastic from 'components/ContainerElastic'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'States',
  components: {
    ContainerElastic
  },
  data () {
    return {
      tools: false,
      columns: [],
      data: [],
      filter: '',
      pagination: {
        sortBy: 'id',
        descending: false,
        page: 1,
        rowsPerPage: 10
      }
    }
  },
  computed: {
    ...mapState('Base', ['langSelected']),
    ...mapState('State', ['stateLst'])
  },
  mounted () {
    // Load datagrid source data
    this.loadDatagrid()
  },
  methods: {
    ...mapActions('State', ['getStateList', 'deleteState']),
    loadDatagrid () {
      this.getStateList().then((response) => {
        this.columns = [
          { name: 'id', field: '_id', label: 'ID', align: 'left', sortable: true, style: 'width: 10%' },
          { name: 'title', field: 'title', label: this.$t('states.state'), align: 'left', sortable: true, style: 'width: 60%' },
          { name: 'code', field: 'code', label: this.$t('states.code'), align: 'left', sortable: true, style: 'width: 15%' },
          { name: 'actions', label: this.$t('generic.actions'), align: 'center', sortable: false, style: 'width: 15%' }
        ]
        this.data = this.stateLst
      }).catch((e) => {
        console.error(e)
      })
    },
    editClick (row) {
      this.$store.commit('State/SET_STATE', row)
      this.$router.push('states/form')
    },
    deleteClick (row) {
      this.openDialog(this.$t('generic.warning'), this.$t('generic.deleteWarning'), 'negative').onOk(() => {
        let payload = row
        this.deleteState(payload).catch(err => {
          this.$q.notify(err.message)
        })
      })
    }
  },
  watch: {
    langSelected (val) {
      this.loadDatagrid()
    }
  }
}
</script>
