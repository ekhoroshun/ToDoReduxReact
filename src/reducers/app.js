const initialState = {
    list: []
};

export default function(state = initialState, action) {

    switch(action.type) {

        case 'ADD_NEW_TASK':

            return Object.assign({}, state, {
                list: state.list.concat(action.payload)
            });

        break;

        case 'REMOVE_ITEM':

            return Object.assign({}, state, {
                list:  state.list.filter((item) => {
                    return item.id != action.payload
                })
            });

        break;

        case 'CHANGE_ITEM': // pravilno

            let tempTasks = state.list;
            
            for ( var i in tempTasks) {
                
                if ( tempTasks[i]["id"] == action.payload){
                   
                    tempTasks[i]["completed"] = true;
                    
                    
                }
            
            }
            
            return Object.assign({}, state, {
                list: tempTasks
            });
            

        break;

        case 'EDIT_ITEM':

             let tempTasksForEdit = state.list;

            for ( var i in tempTasksForEdit) {
                
                if ( tempTasksForEdit[i]["id"] == action.payload.id){
                   
                    tempTasksForEdit[i]["text"] = action.payload.text;
                    
                    
                }
            
            }
            
            return Object.assign({}, state, {
                list: tempTasksForEdit
            });
            

        break;

        default:
            return state;
    }

}