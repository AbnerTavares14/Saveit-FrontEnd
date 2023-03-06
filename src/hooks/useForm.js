import {useReducer} from 'react';

const ACTION_TYPES = Object.freeze({
    handleForm: "handleForm",
    resetForm: "resetForm",
});

function formReducer(state, action) {
    if(action.type === ACTION_TYPES.handleForm && action.files?.length > 0) {
        const file = action.files[0];
        return {
            ...state,
            [action.name]: file
        }
    }

    if(action.type === ACTION_TYPES.handleForm) {
        return {
            ...state,
            [action.name]: action.value
        };
    } 

    if(action.type === ACTION_TYPES.resetForm) {
        return {
            ...action.initialState,
        };
    }

}


function useForm({initialState = {}, reducer = formReducer}) {
    const [form, dispatch] = useReducer(reducer, initialState);

    function handleForm({target: {name, value, files}}) {
        return dispatch({type: ACTION_TYPES.handleForm, name, value, files});
    }


    function resetForm() {
        return dispatch({type: ACTION_TYPES.resetForm, initialState});
    }

    return [form, handleForm, resetForm];
}

export {useForm, ACTION_TYPES, formReducer};