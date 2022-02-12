const initialState = JSON.parse(localStorage.getItem('redux'));

const favoriteUnfavorite = (state = initialState, action) => {
    switch (action.type) {
        case 'FAVOURITE':
            if (action.data === undefined) return state
            if (!state.includes(action.data)) state.push(action.data)
            return state
        case 'UNFAVOURITE':
            if (action.data === undefined) return state
            state = state.filter((item) => {
                return item !== action.data
            })
            return state
        default: return state
    }
}

export default favoriteUnfavorite;