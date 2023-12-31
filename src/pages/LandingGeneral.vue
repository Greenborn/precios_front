<template>
  <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-primary">
    <div class="container p-0">
      <a class="navbar-brand" href="#/dashboard">
        <div class="row align-items-center justify-content-center">
          <div class="col">
            <b class="ml-3">Precios de Tandil</b>
          </div>
        </div>
      </a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="d-flex">
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
          <li class="nav-item">
            <a class="nav-link active" href="#/dashboard">Buscador</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#/novedades">Novedades</a>
          </li>
        </ul>
      </div>  
    </div>
  </nav>
  
  <BusquedaYCarga ref="busqueda_y_carga" />
  
</template>

<script setup>
import { ref } from 'vue'
import BusquedaYCarga from "../components/publico/BusquedayCarga.vue";

const termino_busqueda = ref("")
const caja_busqueda = ref()
const busqueda_y_carga = ref()

async function buscar(){
  let res = await busqueda_y_carga.value.buscar(termino_busqueda.value)
  if (res != undefined)
    caja_busqueda.value.focus()
}
</script>

<style scoped>

#cont_busca{
  padding-left: 4rem;
}
</style>