import { http } from './config'

export default {
    list: () => {
        return http.get('pessoas')
    },

    save: (person) => {
        return http.post('pessoas', person)
    },

    edit: (person) => {
        return http.put('pessoas/' + person.id, person)
    },

    apagar: (person) => {
        return http.delete('pessoas/' + person.id, person)
    }
}