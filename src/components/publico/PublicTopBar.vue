<template>
<nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-primary">
    <div class="container p-0">
      <a class="navbar-brand" href="#/">
        <div class="row align-items-center justify-content-center">
          <div class="col">
            <b class="ml-3">Precios de Tandil</b>
          </div>
        </div>
      </a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="d-flex" v-if="storeApp.ruta_actual.path == '/'">
        <div class="w-100" id="cont_busca">
          <div class="row align-items-center justify-content-center">
            <div class="col-auto p-0 mr-1">
              <input class="form-control me-2" v-model="termino_busqueda" type="text" placeholder="Por ej: Manzana" aria-label="Buscar" 
              @keyup.enter="buscar" ref="caja_busqueda">
            </div>
            <div class="col-auto p-0">
              <button class="btn btn-success" type="button" @click="buscar">Buscar</button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto p-3">
          <li class="nav-item" v-for="(enlace) in enlaces" :key="enlace">
            <span class="nav-link" @click="click(enlace)"
                :class="{ active: storeApp.ruta_actual.path == enlace.path }">{{ enlace.title }}</span>
          </li>
        </ul>
      </div>  
    </div>
</nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import { AppStore } from "../../stores/app"
import { useRouter, useRoute } from 'vue-router'

const emit  = defineEmits(['buscar_evnt'])
const storeApp = AppStore()
const router = useRouter()
const route = useRoute()

const termino_busqueda = ref('')

const enlaces = ref([
    { path: '/', title: 'Buscador' },
    { path: '/novedades', title: 'Novedades' },
    { path: '/estadisticas', title: 'Estadísticas' }
])

function click( item ){
    storeApp.ruta_actual = item
    router.push(item.path)
}

function buscar(){
  emit('buscar_evnt', termino_busqueda.value)
}

onMounted(()=>{
    storeApp.ruta_actual['path'] = route.path
})
</script>

<style>
#cont_busca{
  padding-left: 4rem;
}

.nav-link{
    cursor: pointer;
}
</style>