<template>
<nav class="navbar fixed-top navbar-expand-lg navbar-dark p-0 bg-primary">
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

            
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto p-3">
        <li class="nav-item">
            <a class="nav-link" href="#/">Buscador</a>
        </li>
        <li class="nav-item">
            <a class="nav-link active" href="#/novedades">Novedades</a>
        </li>
        </ul>
    </div>  
    </div>
</nav>
    
<div class="container-fluid" id="novedades-cnt">
    <div class="row align-items-center justify-content-center">
        <div class="col-12 col-md-10 col-lg-8 ">
            <div class="card mb-1 p-0">

                <div class="card-header p-4 pb-0">
                    <h4>Novedades</h4>
                </div>

                <div class="card-body p-4">
                    <template v-if="novedades.length != 0">
                        <div class="alert alert-info" v-for="novedad in novedades" :key="novedad">
                            <div class="row">

                                <div class="col-12 col-md-6 col-lg-auto">
                                    <b>{{ novedad.datetime }}:</b>
                                </div>

                                <div class="col-12 col-md-6 col-lg-auto">
                                    {{ novedad.text }}
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>

        </div>
    </div>
</div>
    
</template>
  
<script setup>
    import { ref, onMounted } from 'vue'
    import { public_news } from '../api/public/publicEndpoints'
    import { AppStore } from "../stores/app"

    const storeApp = AppStore()
  
    const novedades = ref([])

    onMounted(async ()=>{
        storeApp.loading = true
        let res = await public_news()
        if (res){
            storeApp.loading = false
            if (res?.error){
                storeApp.mostrar_alerta( "Ocurrio un error al cargar las novedades" )
                return false
            }
            novedades.value = res?.items
        } else
            storeApp.loading = false
    })
</script>
  
<style scoped>
  
#novedades-cnt{
    margin-top: 5rem;
}
</style>