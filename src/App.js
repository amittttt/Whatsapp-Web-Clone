import { render } from "react-dom";
import Chat  from './Chat';
import './App.css';
import Sidebar from './Sidebar';
import React, { useEffect } from "react";
import { createRoot } from "react-dom";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
import { auth } from "./Firebase";


function App() {

const [{user}, dispatch]= useStateValue();
console.log(user);

useEffect( () => {
  auth.onAuthStateChanged(user => {
    dispatch({
      type: "SET_USER",
      user: user
    })
  })
},[])
  return (
    <Router>
      { !user ? (<Login/>) : (
       <div className="App">
       <div className='app-body'>
         <Sidebar />
         <Routes>
           <Route exact path="/" element={<Chat/>}>
           </Route>
           <Route path="/room/:roomId" element={<Chat/>}>
           </Route>
           
         </Routes>
       </div>
     </div>)
      }
        
     
    </Router>
  );
}

export default App;
