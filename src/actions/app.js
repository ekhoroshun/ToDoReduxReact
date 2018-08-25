import axios from 'axios';
import store from './../reducers';

export function addNewTask(new_task) {

    return {
        type: 'ADD_NEW_TASK',
        payload: new_task
    }

}

export function removeTask(item_to_remove) {

    return {
        type: 'REMOVE_ITEM',
        payload: item_to_remove
    }

}

export function changeTask(item_to_change) {

    return {
        type: 'CHANGE_ITEM',
        payload: item_to_change
    }

}

export function editTask(item_to_edit) {

    return {
        type: 'EDIT_ITEM',
        payload: item_to_edit,
        
    }

}

