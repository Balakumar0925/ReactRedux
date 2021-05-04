import addTask from './addtask';
import MarkList from './marklist';
import {combineReducers} from 'redux';

const rootReducers =combineReducers({
    addtodo:addTask,
    marktodo:MarkList
});

export default rootReducers;