<template>
  <q-layout view="hHh lpR fFf" class="blue-grey-1">
    <q-page-container>
      <q-page class="flex flex-center" style="background: url(https://source.unsplash.com/1280x720/?peace) no-repeat; background-size: cover;">
        <q-card style="width: 340px;">
          <q-card-section>
            <h1 color="primary" class="text-h5 q-ma-none">Recuperação de senha</h1>
          </q-card-section>
          <q-card-section>
            <q-form ref="myForm" autocorrect="off" autocapitalize="off" autocomplete="off" spellcheck="false">
              <div class="q-gutter-y-md">
                <q-input v-model="email" type="email" dense flat label="E-mail">
                  <template v-slot:prepend>
                    <q-icon name="email" />
                  </template>
                </q-input>
                <div class="flex justify-between">
                  <q-btn color="primary" outline label="Voltar" to="/" />
                  <q-btn color="primary" label="Enviar" to="/" />
                </div>
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
export default {
  name: 'Login',
  data () {
    return {
      email: ''
    }
  }
}
</script>
