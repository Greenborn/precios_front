import create from '../../helpers/request'
const request = create(import.meta.env.VITE_APP_BACKEND_ADMIN, false)

export function busqueda( termino ) {
  return request({ url: '/publico/busqueda/precios?product_name='+encodeURI(termino), method: 'get' })
}

export function public_news() {
  return request({ url: '/public-news', method: 'get' })
}

export function get_estadistica(id) {
  return request({ url: '/publico/estadistica/data?id_estadistica='+id, method: 'get' })
}

export function enviar_datos(datos) {
  return request({ url: '/publico/estadistica/precios_usuarios', method: 'post', data: datos })
}