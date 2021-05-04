let initalstate={
    "Books": ["Reduxjs.org", "Reduxtoolkit.org", "" ]
};

export default function MarkList(state=initalstate, action){
    switch (action.type){
        case "todo/addbook":{
            console.log('book', action.payload);
            return {
               ...state,
               "Books" : [...state.Books , action.payload]
            }
        }
        case "GoogleAPI2":{
            return {
                ...state,
                "Books": [...state.Books , action.payload]
            }
        }
        default : return state;
    }
}