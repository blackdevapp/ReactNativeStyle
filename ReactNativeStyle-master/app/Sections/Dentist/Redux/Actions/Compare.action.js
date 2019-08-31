export const ADD_TO_COMPARE_LIST = 'ADD_TO_COMPARE_LIST';

export function addToCompareList() {

    let slice = state.compareLab.slice(0, 2);
    slice.unshift(newLabToCompare);
    // this.setState({ compareLab: slice })

    return (dispatch) => {
        dispatch({
            type: ADD_TO_COMPARE_LIST,
            compareList: slice
        });
    }
}