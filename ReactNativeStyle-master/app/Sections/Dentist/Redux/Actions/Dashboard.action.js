export const NAV = 'NAV';
export const LOADING = 'LOADING';


export function navigateTabs(index) {
    return (dispatch) => {
        dispatch({
            type:NAV,
            activeIndex: index,
            loading:false
        });
    };
}

export function showLoading(){
    return (dispatch) => {
        dispatch({
            type:LOADING,
            loading: true,
        });
    }
}
