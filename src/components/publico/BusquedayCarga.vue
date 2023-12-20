<template>
    <div class="row">
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <div class="card">
                <div class="card-header">
                    Buscá tu precio
                </div>
                <div class="card-body">
                    <p>Ingrese el nombre del producto que desea consultar:</p>
                    <div class="input-group mb-3">
                        <input v-model="termino_busqueda" type="text" class="form-control"
                            placeholder="Nombre del producto">
                        <div class="input-group-append">
                            <button @click="buscar" class="btn btn-primary" type="button">Buscar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const termino_busqueda = ref('');

const buscar = () => {
    // Lógica para realizar la búsqueda
    console.log("Se ha realizado la búsqueda del producto: " + termino_busqueda.value);
}
</script>