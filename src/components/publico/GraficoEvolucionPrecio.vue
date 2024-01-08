<template>
    <h4>{{ parametros?.item?.products?.name }}</h4>
    <Chart type="line" :data="chartData" :options="chartOptions" class="h-30rem" />
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
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: "#198754",
                tension: 0.4
            },
        ]
    });
const chartOptions = ref();


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

function getPrecioDia( precios, dia ){
    let ultimo_precio = precios[0]['price']

    for (let i = 0; i < precios.length; i++){

        let fecha_fin = new Date(dia)
        fecha_fin.setHours(23,59,59,999)

        if (precios[i]['date_time']>fecha_fin.getTime())
            return ultimo_precio

        ultimo_precio = precios[i]['price']
    }

    return ultimo_precio
}

onMounted(() => {
    let labels = []

    let precios = []
    let resultados = props.parametros.resultados['items']

    for (let i = 0; i < resultados.length; i++){
        resultados[i]['date_time'] = new Date(resultados[i].date_time).getTime()
        precios = insertar_ordenado(precios, resultados[i], 'date_time')
    }
    let ultimo = precios[precios.length-1]['date_time']

    let cant_dias = Math.floor((ultimo-precios[0]['date_time']) / 1000 / 60 / 60 / 24) + 1
   
    let dia_ini = new Date(precios[0]['date_time'])
    for (let i = 0; i < cant_dias; i++){
        labels.push( fechaDateToString( dia_ini, "/" ) )
        dia_ini.setDate(dia_ini.getDate() + 1)
    }

    chartData.value.labels = labels

    let data_set = []
    for (let i = 0; i < labels.length; i++){
        let fecha_ini = fechaStringToDate(labels[i], '/','DD-MM-YYYY')
        
        data_set.push(getPrecioDia(precios, fecha_ini))
    }
    chartData.value.datasets[0].data = data_set
})
</script>