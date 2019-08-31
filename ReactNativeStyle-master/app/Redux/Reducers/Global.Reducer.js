import { DRAWER_OPEN,SET_ITEM } from "../Actions/Global.Actions"; 

let globalDataState = {
    drawerOpen: false,
    items:[]
}

export const GlobalReducer = (state = globalDataState, action) => {

    switch (action.type) {
        case DRAWER_OPEN:
            state = Object.assign({}, state, {
                drawerOpen: action.drawerOpen,
            });
            return state;
        case SET_ITEM:
            state = Object.assign({}, state, {
                items:action.items
            });
            return state;

        default:
            return state;
    }
};