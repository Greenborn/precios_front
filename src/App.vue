<template>
  <router-view />

  <Dialog :header="storeApp.modal_generico.titulo" v-model:visible="storeApp.modal_generico.activo" >
    <component :is="storeApp.modal_generico.componente" :parametros="storeApp.modal_generico.parametros"></component>
  </Dialog>
  <Spinner :loading="storeApp.loading"></Spinner>
</template>

<script setup >
  import { AppStore } from "./stores/app";

  import Spinner   from './components/layout/Spinner.vue'

  const storeApp = AppStore()
</script>
