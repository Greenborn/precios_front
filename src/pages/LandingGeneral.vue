<template>
  <div class="row">
    <div class="col">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand p-2" href="#">
          <img src="ruta_del_logo.png" alt="Buscador de Precios de Tandil" width="30" height="30">
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto p-3">
            <li class="nav-item">
              <!--<a href="#/admin/login"><Button label="Iniciar Sesión" /></a>-->
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>

  <div class="container">
    <BusquedaYCarga />
  </div>
  
</template>

<script setup>
import BusquedaYCarga from "../components/publico/BusquedayCarga.vue";
</script>

<style scoped>
</style>