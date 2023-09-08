import { http } from './config'

export default {
    list: () => {
        return http.get('produtos')
    },

    save: (product) => {
        return http.post('produtos', product)
    },

    edit: (order) => {
        return http.put('produtos/' + product.id, product)
    },

    apagar: (order) => {
        return http.delete('produtos/' + product.id, product)
    }
}