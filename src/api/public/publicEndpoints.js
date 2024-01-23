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

export function get_categorias() {
  return request({ url: '/publico/categorias/all', method: 'get' })
}

export function get_sub_categorias( cat_menu_id ) {
  return request({ url: '/publico/categorias/get_sub_categorias?cat_menu_id='+cat_menu_id, method: 'get' })
}

export function get_empresas_categoria( menu_category_id ) {
  return request({ url: '/publico/categorias/get_empresas_categoria?menu_category_id='+menu_category_id, method: 'get' })
}

export function get_categorias_empresa( enterprise_id ) {
  return request({ url: '/publico/categorias/get_categoria_empresa?enterprise_id='+enterprise_id, method: 'get' })
}

export function get_productos( category_id ) {
  return request({ url: '/publico/productos/all?category_id='+category_id, method: 'get' })
}