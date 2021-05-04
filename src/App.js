import logo from './logo.svg';
import './App.css';
import {store} from './store';
import {useSelector} from 'react-redux';
//import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Row, Col,Table} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';


function tasklist(){
  console.log(store.getState().addtodo.tasks);

  /*return store.getState().addtodo.tasks.map(function(e, index){
    return (
      <ul>
        <input type="checkbox" id={index} ></input>
        {e.TaskName}
      </ul>
    )
  })*/
  return store.getState().addtodo.tasks
}

function taskstatus(){
  console.log(store.getState().addtodo.tasks);

  return store.getState().addtodo.tasks.map(function(e, index){
    return (
      <ul>
        <div id={"taskStatus"+index} data-value={e.status}>
        {e.status}
        </div>
      </ul>
    )
  })
}


/*function taskStatus(){
  //console.log(store.getState().)
  return true;
}*/

function Handle(){
    var addtask = prompt("enter your task" );
    console.log(addtask)
    return addtask;  
 }
 
 /*function Handlebook(){
  var addbook = prompt("enter your book" );
  console.log(addbook)
  return addbook;  
}*/


function bookList(){
  console.log('booklist' ,store.getState());
    return(
    //JSON.stringify(store.getState().marktodo.Books)
    store.getState().marktodo.Books.map(function(x){
      return (
        <ul>
          {x}
        </ul>
          
      )
    })
        //store.getState().marktodo.Books
  )}

/*function status(){
   var key = store.getState().addtodo.tasks.map(function(e,index){
     return index;
   })  
   console.log(key);
}*/

function App() {
  const tasks = useSelector(tasklist);
  const taskStatus=useSelector(taskstatus);
  //const status1 = useSelector(status);
  const bookreference = useSelector(bookList)
  return (
        <div>
        <header className="head">
        <nav class="navbar navbar-dark bg-red">
            TODO APP
           </nav>
           </header>
         <Table striped bordered hover >
         <thead class="table table-bordered">
            <tr >
              <th>TASKS LIST</th>
              <th>Status</th>
              <th>BOOKS</th>
            </tr>
          </thead>
          <tbody class="table table-bordered">
           {
             /**
             <tr>
              <td>{tasks}</td>
              <td>{taskStatus}</td>
              <td>{bookreference}</td>
            </tr>
              */

           } 
           {tasks.map((x, index) => {
             return (
               <tr>
                 <td>
                 <input type="checkbox" id={index} ></input>
                 {x.TaskName}
                  
                 </td>
                 <td>
                   {x.status}
                 </td>

                 <td>
                   {bookreference[index]}
                 </td>
               </tr>
             )
           })}
          </tbody>
          </Table>  
            
            <Button className="buttonclass" onClick={function(){
            store.dispatch({
              "type":"todo/add",
              "payload":Handle()
            })
            store.dispatch({
              "type":"todo/addbook",
              "payload":""
            })
          }}>ADD TASK</Button>

          <Button className="buttonclass1" onClick={function(){
            var sprompt = prompt("Enter a topic name to be searched on Google API book store")
            store.dispatch({
              type: "GoogleAPI",
              payload: sprompt
            })
          }}>Add Book from Google API</Button>
            
            
            <Button onClick={function(){
              //alert('hi');
              //alert('inside button' + document.getElementById('taskStatus1').getAttribute('data-value'));
              //alert(document.getElementById('taskStatus1').getAttribute('data-value'))
              const selectedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');

              //alert(selectedCheckboxes.length);
              selectedCheckboxes.forEach(function(value){
               // alert(value.id);
                //dispatch an event to update it's state
                store.dispatch({
                  "type": "todo/complete",
                  "action.id":value.id,
                  "payload": value.id
                })
              })}}>Change TaskStatus</Button>
            
        </div> 
  );
}

export default App;
