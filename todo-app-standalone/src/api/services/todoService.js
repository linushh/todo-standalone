import ApiService from "./apiService"
// import { userStore } from "@/stores/userStore"
// import { userStore } from "../../stores/userStore"
const TODO_API_BASE_URL = "http://localhost:8080/api/todo"

class TodoService extends ApiService {
    constructor() {
        super(TODO_API_BASE_URL)
    }

    async post(data, accessToken) {
        const newTodo = {
            name: data.name,
            date: data.date,
            completed: false
        }
        return await this.makeRequest('POST', '/add', newTodo, accessToken, null)
    }

    async put(id, data, accessToken) {
        return await this.makeRequest('PUT', `/update/${id}`, data, accessToken, null)
    }
    
    async getAll(accessToken) {
        return await this.makeRequest('GET', '/getall', null, accessToken, null)
    }
    
    // async makeRequest(method, endpoint, data = null, accessToken = null , returnFullResponse = null)
    async delete(data, accessToken){
        await this.makeRequest('DELETE', `/delete/${data}`, null, accessToken, null)
    }
}

export default new TodoService();