import axios from 'axios';
import categories from "../store/categories";

export default class BoardgameService {

    static async _makeRequest(url) {
        try {
            return await axios.get(url)
        } catch (_) {
            return {data: null};
        }
    }

    static async findAll() {
        const response = await this._makeRequest(`http://localhost:3000/boardgame`)
        const boardgames = await response.data

        if (
            boardgames === undefined
            || boardgames === null
        ) {
            return null
        }

        return boardgames
    }

    static async find(id) {
        const response = await this._makeRequest(`http://localhost:3000/boardgame/${id}`)
        const boardgame = await response.data

        if (
            boardgame === undefined
            || boardgame === null
        ) {
            return null
        }

        if (boardgame.data != null) {
            const category = categories.find(category => category.id === +boardgame.data.category)
            if (category !== undefined) {
                boardgame.data._category = category;
            }
        }

        return boardgame
    }

    static async delete(id) {
        try {
            await axios.delete(`http://localhost:3000/boardgame/${id}`)
            return true;
        } catch (_) {
            return false
        }
    }
}
