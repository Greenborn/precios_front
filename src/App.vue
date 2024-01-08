<template>
  <router-view />

  <ModalsManager></ModalsManager>
  <Spinner :loading="storeApp.loading"></Spinner>
</template>

<script setup >
  import { AppStore } from "./stores/app";
  import ModalsManager   from './components/layout/ModalsManager.vue'
  import Spinner   from './components/layout/Spinner.vue'

  const storeApp = AppStore()
</script>
