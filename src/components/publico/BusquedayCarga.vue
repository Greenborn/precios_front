<template>
<div class="container-fluid" id="buscador-cnt">
    <div  class="row align-items-center justify-content-center d-none d-sm-flex">
        <div class="col-12 col-md-10 col-lg-8">
            <div class="card mb-1 p-0">
                <div class="card-header p-4">
                    <h4>Buscá tu precio </h4>
                    <small>Ingrese el nombre del producto que desea consultar:</small>
                </div>
                <div class="card-body p-4">
                    <div class="input-group mb-3">
                        <input v-model="termino_busqueda" type="text" class="form-control"
                            placeholder="Nombre del producto" @keyup.enter="hacer_busqueda">
                        <div class="input-group-append">
                            <button @click="buscar" class="btn btn-primary" type="button">Buscar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row align-items-center justify-content-center">
        <div class="col-12 col-md-10 col-lg-8 ">
            <div class="card mb-1 p-0">

                <div class="card-header p-4 pb-0">
                    <h4>Resultados</h4>
                </div>
                <div class="card-body p-4">
                    <template v-if="resultados.length == 0">
                        <div class="alert alert-info">
                            No hay resultados, pruebe con otro término de búsqueda.
                        </div>
                    </template>
                    <template v-if="resultados.length != 0">
                        <div v-for="resultado in resultados" :key="resultado.producto" class="card mb-1 p-0">
                            <div class="card-header p-4 pt-0 pb-0">
                                <div class="row align-items-center justify-content-center">
                                    <div class="col-12 col-sm-4 price-cont">
                                        $ {{ formatMoney(resultado?.price) }}
                                    </div>
                                    <div class="col-12 col-sm-8 product-name-cont">
                                        {{ resultado?.products?.name }}
                                    </div>
                                </div>
                                
                            </div>
                            <div class="card-body p-4">
                                <p class="pb-1 mb-0 mt-0"><b>Actualizado el:</b> {{ resultado?.date_time }}</p>
                                <p class="pb-1 mb-0 mt-0"><b>Comercio:</b> {{ resultado?.branch?.name }} (uno de sus locales)</p>                                
                            </div>
                        </div>
                    </template>
                </div>
            </div>

        </div>
    </div>

    <div class="row align-items-center justify-content-center">
        <div class="col-12 col-md-10 col-lg-8 ">
            <div class="card mb-1 p-0">

                <div class="card-header p-4 pb-0">
                    <h4>Estadísticas Generales</h4>
                </div>

                <div class="card-body p-4">
                    <template v-if="estadisticas_inc.length != 0">
                        <div class="row">
                            <div class="col-12 col-md-6" v-for="estadistica in estadisticas_inc" :key="estadistica">
                                <div class="row">

                                    <div class="col-12 col-md-6 col-lg-auto">
                                        <b>{{ estadistica.description }}:</b>
                                    </div>

                                    <div class="col-12 col-md-6 col-lg-auto">
                                        {{ estadistica.value }}
                                    </div>
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
import { ref, onMounted  } from 'vue'
import { busqueda, incremental_stats } from '../../api/public/publicEndpoints'

import { formatMoney } from '../../helpers/formatter'
import { AppStore } from "../../stores/app"

defineExpose({ buscar })
const storeApp = AppStore()

const termino_busqueda = ref('')
const resultados = ref([]);
const estadisticas_inc = ref([])

async function buscar ( termino = undefined ) {
    if (termino != undefined)
        termino_busqueda.value = termino

    if (termino_busqueda.value === '') {
        storeApp.mostrar_alerta( "Por favor, ingrese el nombre del producto." )
        return false
    }

    resultados.value = []
    storeApp.loading = true
    let res = await busqueda(termino_busqueda.value);
    if (res) {
        storeApp.loading = false
        if (res?.error){
            storeApp.mostrar_alerta( "Ocurrio un error, re-intente más tarde." )
            return false
        }
        resultados.value = res?.items ? res.items: [];
        return true
    } else {
        storeApp.loading = false
        return false
    }
}

async function hacer_busqueda(){
    await buscar(termino_busqueda.value)
}

async function cargar_estadisticas(){
    storeApp.loading = true
    let res = await incremental_stats()
    if (res){
        storeApp.loading = false
        if (res?.error){
            storeApp.mostrar_alerta( "Ocurrio un error al cargar las estadísticas" )
            return false
        }
        estadisticas_inc.value = res?.items
    } else
        storeApp.loading = false
}



onMounted(async ()=>{
    await cargar_estadisticas()
})

</script>

<style>
.price-cont{
    color:rgb(70, 116, 0);
    font-weight: bolder;
    min-width: 226px;
    font-size: 2rem;
}

.product-name-cont{
  font-weight: bolder;
  font-size: 1rem;
  color: #1e3c82;
}

#buscador-cnt{
    margin-top: 5rem;
}
</style>