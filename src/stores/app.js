import { ref }         from "vue"
import { defineStore } from "pinia"
import { shallowRef } from "vue"

import DialogConfirm  from '../components/genericos/DialogConfirm.vue'

export const AppStore = defineStore('app',() =>  {
  const userInfo       = ref({})
  const rutas          = ref([])
  const tipoUsuario    = ref('')
  const opcionesMenu   = ref([])
  const sidebarVisible = ref(true)
  const ruta_actual    = ref({})

  const modal_generico   = ref({ activo: false, componente: null, parametros: {}, titulo: '' })

  const loading = ref(false)

  const toggle_sidebar = function(){
    this.sidebarVisible = !this.sidebarVisible
  }

  const mostrar_modal = function( componente, titulo, parametros = {} ){
    this.modal_generico.activo     = true
    this.modal_generico.componente = shallowRef(componente)
    this.modal_generico.parametros = parametros
    this.modal_generico.titulo     = titulo
  }

  const mostrar_alerta = function( texto ){
    this.mostrar_modal( DialogConfirm, 'Info', { "texto": texto, 
      "botones": [ 
        { label: 'Aceptar', icon: 'pi pi-check', class: 'p-button-text', autofocus:true, onClick: ()=>{ this.modal_generico.activo = false } } 
      ] } )
  }

  return {
    userInfo, sidebarVisible, rutas, opcionesMenu, tipoUsuario, ruta_actual, toggle_sidebar, 
    modal_generico, mostrar_modal, loading, mostrar_alerta
  }
})