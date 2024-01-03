import create from '../../helpers/request'
const request = create(import.meta.env.VITE_APP_BACKEND_ADMIN, false)

export function busqueda( termino ) {
  return request({ url: '/products_by_price?product_name='+encodeURI(termino), method: 'get' })
}

export function incremental_stats() {
  return request({ url: '/public-incremental-stats', method: 'get' })
}

export function public_news() {
  return request({ url: '/public-news', method: 'get' })
}

export function get_estadistica(id) {
  return request({ url: '/estadistica?id_estadistica='+id, method: 'get' })
}