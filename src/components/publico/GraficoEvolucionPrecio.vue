<template>
    <div class="row align-items-center justify-content-center">
        <div class="col-12 col-md-10 col-lg-8">
            <h4>{{ parametros?.item?.products?.name }}</h4>
            <Chart type="line" :data="chartData" :options="chartOptions" class="w-full" />
        </div>
    </div>
    
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {  fechaDateToString, fechaStringToDate } from '../../helpers/formatter'

const props = defineProps(['parametros'])

const chartData = ref({
        labels: [],
        datasets: [
            {
                label: 'Precio a lo largo del tiempo',
                data: [],
                fill: false,
                borderColor: "#198754",
                tension: 0
            },
        ]
    });
const chartOptions = ref({
    "responsive": true
});


function insertar_ordenado( array_, elemento, campo = 'price' ){
  const ARR_LEN = array_.length

  if (ARR_LEN == 0){
    array_.push(elemento)
    return array_
  }

  for (let i=0; i < ARR_LEN; i++){
    if (array_[i][campo] > elemento[campo]){
      array_.splice(i, 0, elemento)
      return array_
    }
  }

  array_.push(elemento)
  return array_
}

onMounted(() => {
    let labels = []

    let precios = []
    let resultados = props.parametros.resultados['items']

    for (let i = 0; i < resultados.length; i++){
        let fecha = new Date(resultados[i].date_time)
        resultados[i]['date_time'] = fecha.getTime()
        precios = insertar_ordenado(precios, resultados[i], 'date_time')
    }

    let data_set = []
    for (let i = 0; i < precios.length; i++){
        labels.push( fechaDateToString( new Date( precios[i]['date_time'] ), "/", 'dd-mm-YYYY H:M' ) )
        data_set.push( precios[i].price )
    }

    chartData.value.labels = labels
    chartData.value.datasets[0].data = data_set
})
</script>