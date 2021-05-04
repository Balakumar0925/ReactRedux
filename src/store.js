import { Next } from 'react-bootstrap/esm/PageItem';
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducers from './root/rootreduce';
import axios from 'axios';

let initialstate = {
    "tasks" : ["Redux learning","Practise Redux","learn ReduxAsync task"]
};

export const store = createStore(rootReducers , initialstate, compose(applyMiddleware(anotherMiddleWare), applyMiddleware(changeValue)));


function changeValue( {getState}) {
    //console.log('what is the schema of {getState', {getState});
    return function(next){
        return async function(action) {
            console.log('will dispatch action', action);
            console.log('initial payload', action.payload);
            //changing to a diff value
            //action.payload = "Changed using redux middleware";
            /*axios.get('https://www.googleapis.com/books/v1/volumes?q=reactjs').then((res)=>{
                console.log('value' , res.data.items[0].volumeInfo.title);
                action.payload = res.data.items[0].volumeInfo.title
            }).catch((err)=>{ 
                console.log(err);
            });*/
            if (action.type == "GoogleAPI") {
                console.log('before calling next action dispatch', store.getState());
                 let options = {
                     url : 'https://www.googleapis.com/books/v1/volumes',
                     method : "GET",
                     params : {
                         q : action.payload
                     }
                 };
                let something= await axios(options); 
               // let something = await axios.get('https://www.googleapis.com/books/v1/volumes?q='+ action.payload);
                console.log(something);
                action.payload =  something.data.items[0].volumeInfo.title;
                const returnValue  = next(action);
                store.dispatch({
                    type:"GoogleAPI2",
                    payload: something.data.items[0].accessInfo.webReaderLink
                });
                return returnValue;
            } else {
                console.log('r we returning from this');
                const returnValue = next(action);
                return returnValue;
            }
        }
    }
}

function anotherMiddleWare({getState}) {
    return function(next) {
        return function(action) {
            console.log("This is a logger function, which logs the action");
            //console.log(store.getState());
            /*if(action.payload==null){
                console.log('r we exiting from this');
               // return  store.getState();
            } else {
                //let nextaction = next(action);
                //return nextaction;
                return next(action);

            }*/
            if(action.payload != null) {
                //then only call the next middleware/reducer
                return next(action);
            }
           
        }
    }
}