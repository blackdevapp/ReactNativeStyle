import { NAV,LOADING } from "../Actions/Dashboard.action" 

let DashboardDataState = {
    activeIndex: 0,
    loading:false
};

export const DashboardReducer = (state = DashboardDataState, action) => {
    switch (action.type) {
        case NAV:
            state = Object.assign({}, state, {
                activeIndex: action.activeIndex,
                loading:action.loading
            });
            return state;
        case LOADING:
            state = Object.assign({}, state, {
                loading:action.loading
            });
            return state;
        default:
            return state;
    }
}