<template>
    <PublicTopBar />

    <div class="container-fluid" id="estadisticas-cnt">

        <div class="row align-items-center justify-content-center">
            <div class="col-12 col-md-10 col-lg-8 ">
                <div class="card mb-1 p-0">

                    <div class="card-header p-4 pb-0">
                        <h4>Cantidad de precios por negocio</h4>
                    </div>

                    <div class="card-body p-4">
                        <p>
                            Aquí se muestra el total de precios histórico registrado por cada comercio.
                            <br>
                            Cada vez que se agrega un nuevo producto, o el precio del mismo varía se suma 1.
                        </p>
                        Aqui van las estadisticas
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script setup>
import PublicTopBar from "../components/publico/PublicTopBar.vue";

</script>

<style scoped>
#estadisticas-cnt{
    margin-top: 5rem;
}
</style>