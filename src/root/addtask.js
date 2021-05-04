let initialstate = {
    "tasks" : [{"TaskName":"Redux learning", "status":"pending"},{"TaskName":"Practise Redux", "status":"pending"},{"TaskName":"learn ReduxAsync task", "status":"pending"}]
};

export default function addTask (state=initialstate, action){
    console.log(action.payload);
    console.log('debugaction');
    switch (action.type){
        case "todo/add": {
            return {
                ...state,
                "tasks": [...state.tasks , {TaskName: action.payload, "status": "pending"}]
            }
        }
        case "todo/complete":{
           let arr = [...state.tasks];
            console.log(arr);
            arr[action.payload].status = "completed";
            console.log('debug11212',arr);
           
            return {
               ...state,
              // "tasks": [{"TaskName":"Redux learning", "status":"completed"},{"TaskName":"Practise Redux", "status":"completed"},{"TaskName":"learn ReduxAsync task", "status":"completed"}]
             "tasks": arr
        }
    }
         case "GoogleAPI":{
             return {
                 ...state ,
                 "tasks": [...state.tasks , {TaskName:action.payload , "status":"pending"}]
             }
         }
        default : return state;
    }
}