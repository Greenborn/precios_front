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
                                <div class="row">

                                    <div class="col">
                                        <p class="pb-1 mb-0 mt-0"><b>Actualizado el:</b> {{ formateaFecha(resultado?.date_time) }}</p>
                                        <p class="pb-1 mb-0 mt-0"><b>Comercio:</b> {{ resultado?.branch?.name }} (uno de sus locales)</p> 
                                    </div>
                                    
                                    <div class="col-auto">
                                        <button type="button" class="btn btn-primary" @click="mostrar_estadisticas(resultado)">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-graph-up" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M0 0h1v15h15v1H0zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07"/>
                                            </svg>
                                        </button>
                                    </div>

                                </div>
                                
                            </div>
                        </div>
                    </template>
                </div>
            </div>

        </div>
    </div>

    <div class="row align-items-center justify-content-center">
        <div class="col-12 col-md-10 col-lg-8">

            <div class="alert alert-success">
                <p><b>Disclaimer:</b></p>
                <p>
                    Si <b>NO</b> queres que tu negocio figure en el listado escribí por MP a 
                    <a href="https://www.facebook.com/TandilPreciosBaratos">TandilPreciosBaratos</a>
                    proporcionando medios de contacto oficiales.
                </p>
                <p>
                    La información proporcionada es obtenida a partir de canales de acceso público y datos 
                    proporcionados por usuarios y puede no ser del todo consistente con la realidad pero da una 
                    idea general de los valores.
                </p>
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
import { busqueda, get_estadistica } from '../../api/public/publicEndpoints'

import { formatMoney, fechaDateToString } from '../../helpers/formatter'
import { AppStore } from "../../stores/app"

import GraficoEvolucionPrecio from './GraficoEvolucionPrecio.vue'

defineExpose({ buscar })
const storeApp = AppStore()

const termino_busqueda = ref('')
const resultados = ref([]);
const estadisticas_inc = ref([])
const MODAL_STYLE = { width: '100vw', 'min-height': "100vh" }

async function mostrar_estadisticas( item ){
    storeApp.loading = true
    let res = await get_estadistica( "variacion_precio&id_producto="+item.product_id+"&id_local="+item.branch_id );
    if (res){
        storeApp.loading = false
        
        storeApp.mostrar_modal(GraficoEvolucionPrecio, 'Variación del Precio a lo largo del tiempo',
            {
                'item': item,
                'resultados': res,
                
                }, 
                { 'styles': MODAL_STYLE })
        
    } else {
        storeApp.loading = false
    }
}

async function buscar ( termino = undefined ) {
    if (termino != undefined && typeof termino == 'string')
        termino_busqueda.value = termino

    if (termino_busqueda.value === '') {
        storeApp.mostrar_alerta( "Por favor, ingrese el nombre del producto." )
        return false
    }

    if (termino_busqueda.value.length < 3) {
        storeApp.mostrar_alerta( "El nombre del producto debe tener al menos 3 caracteres." )
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

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        resultados.value = res?.items ? res.items: [];
        return true
    } else {
        storeApp.loading = false
        return false
    }
}

function formateaFecha( fecha ){
    fecha = new Date(fecha)
    fecha.setHours(fecha.getHours() - 3)
    
    return fechaDateToString(fecha,"/")
}

async function hacer_busqueda(){
    await buscar(termino_busqueda.value)
}

async function cargar_estadisticas(){
    storeApp.loading = true
    let res = await get_estadistica("incremental_stats")
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