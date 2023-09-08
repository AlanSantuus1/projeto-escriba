import { http } from './config'

export default {
    list: () => {
        return http.get('pedidos')
    },

    save: (order) => {
        return http.post('pedidos', order)
    },

    edit: (order) => {
        return http.put('pedidos/' + order.id, order)
    },

    apagar: (order) => {
        return http.delete('pedidos/' + order.id, order)
    }
}