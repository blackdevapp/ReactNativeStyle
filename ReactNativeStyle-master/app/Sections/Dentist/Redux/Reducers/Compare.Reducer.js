import { ADD_TO_COMPARE_LIST } from "../Actions/Compare.action"

const initialState = [{ pic: '', labName: '' }, { pic: '', labName: '' }, { pic: '', labName: '' }];

export const CompareReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_COMPARE_LIST:
            return ({
                    ...state,
                    compareList: action.compareList
                })
        default:
            return state;
    }
}