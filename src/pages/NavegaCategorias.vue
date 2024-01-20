<template>
    <PublicTopBar />

    <div class="container-fluid" id="categorias-cnt">
        <div class="row align-items-center justify-content-center">
            <div class="col-12 col-md-10 col-lg-8 ">
                
                <div class="row">
                    <div class="col-12">
                    </div>
                </div>

                <div class="row">
                    <div class="col-12 col-sm-6 col-lg-4" v-for="cat in categorias_lst" :key="cat">
                        
                        <div class="card text-bg-success mb-3 category_btn" style="height: 10rem;" @click="categoria_click(cat)">
                            <div class="card-body text-center">
                                <div class="row align-items-center justify-content-center">
                                    <div class="col">
                                        <h3><b>{{ cat.nombre }}</b></h3>
                                    </div>
                                </div>
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
import PublicTopBar from "../components/publico/PublicTopBar.vue";

import { get_categorias } from '../api/public/publicEndpoints'

const storeApp = AppStore()

const categorias_lst = ref([])

onMounted(async ()=>{
    storeApp.loading = true
    let res = await get_categorias()
    if (res){
        storeApp.loading = false
        if (!res.stat){
            storeApp.mostrar_alerta( "Ocurrió un error al cargar el listado de categorías" )
            return false
        }
        categorias_lst.value = res?.items
    } else
        storeApp.loading = false
})

function categoria_click( cat ){
    console.log(cat)
}

</script>

<style scoped>
#categorias-cnt{
    margin-top: 6rem;
}

.category_btn{
    cursor: pointer;
    user-select:none;
}

.category_btn:hover{
    background-color: #4db886 !important;
}
</style>