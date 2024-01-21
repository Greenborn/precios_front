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
                    <div class="col-12 col-sm-6 col-lg-4" v-for="cat in menu_lst" :key="cat">
                        
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

import { get_categorias, get_empresas_categoria } from '../api/public/publicEndpoints'

const storeApp = AppStore()

const categorias_lst = ref([])
const enterprise_lst = ref([])
const tipo_categoria = ref("category")
const menu_lst = ref([])

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
        menu_lst.value = categorias_lst.value
    } else
        storeApp.loading = false
})

async function categoria_click( cat ){
    if (tipo_categoria.value == "category"){
        storeApp.loading = true
        let res = await get_empresas_categoria( cat.id )
        if (res){
            storeApp.loading = false
            if (!res.stat){
                storeApp.mostrar_alerta( "Ocurrió un error al cargar el listado de comercios" )
                return false
            }
            enterprise_lst.value = res?.items
            for ( let i = 0; i < enterprise_lst.value.length; i++ )
                enterprise_lst.value[i]['nombre'] = enterprise_lst.value[i]['enterprice']['name']
            
            tipo_categoria.value = "enterprice"
            menu_lst.value = enterprise_lst.value
        } else
            storeApp.loading = false
    }
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