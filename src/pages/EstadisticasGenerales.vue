<template>
    <PublicTopBar />

    <div class="container-fluid" id="estadisticas-cnt">

        <div class="row align-items-center justify-content-center">
            <div class="col-12 col-md-10 col-lg-8 ">

                <div class="accordion" id="acordionCantPrecios">
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Cantidad de precios por negocio
                            </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#acordionCantPrecios">
                            <div class="accordion-body">
                                <p>
                                    Aquí se muestra el total de precios histórico registrado por cada comercio.
                                    Cada vez que se agrega un nuevo producto o el precio del mismo varía se suma 1.
                                    Se muestran aquellos que al menos tienen un precio registrado.
                                </p>
                                <ul class="list-group">
                                    <li v-for="(item) in precios_por_negocio" :key="item" class="list-group-item">
                                        <b>{{ item.nombre }}: </b>{{ item.cantidad }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                </div>

            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { AppStore } from "../stores/app"
import { get_estadistica } from '../api/public/publicEndpoints'
import PublicTopBar from "../components/publico/PublicTopBar.vue";

const storeApp = AppStore()
  
const precios_por_negocio = ref([])

onMounted(async ()=>{
    storeApp.loading = true
    let res = await get_estadistica('precios_por_negocio')
    if (res){
        storeApp.loading = false
        if (res?.error){
            storeApp.mostrar_alerta( "Ocurrio un error al cargar las estadisticas de precios por negocio" )
            return false
        }
        precios_por_negocio.value = res?.items
    } else
        storeApp.loading = false
})
</script>

<style scoped>
#estadisticas-cnt{
    margin-top: 5rem;
}
</style>