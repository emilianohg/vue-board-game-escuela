import axios from 'axios';
import categories from '../store/categories';

export default class FavoritesService {

    static async _makeRequest(url, params = {}) {
        try {
            return await axios.get(url, {params: params})
        } catch (_) {
            return {data: null};
        }
    }

    static async findAll(category = null) {

        const params = {};
        if (Number.isInteger(+category)) {
            params['category'] = category;
        }

        const response = await this._makeRequest(`http://localhost:3000/favorites`, params)
        const boardgames = await response.data

        if (
            boardgames === undefined
            || boardgames === null
        ) {
            return null
        }


        if (Array.isArray(boardgames.data)) {
            boardgames.data = boardgames.data.map(_boardgame => {
                const category = categories.find(category =>  category.id === +_boardgame.category)
                if (category !== undefined) {
                    _boardgame._category = category;
                }
                return _boardgame;
            })
        }

        return boardgames
    }
}
