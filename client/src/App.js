import './App.css';
import { Route, useLocation} from 'react-router-dom';
import {Landing, Form, Dogs, Details} from './views/index';
import { Navbar, Footer } from './components';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getDogs, getTemperaments } from './redux/actions';

function App() {
  
  const Dispatch = useDispatch();
  useEffect(()=>{
    async function fetchData() {
    await Dispatch( getDogs())
    await Dispatch( getTemperaments())}
    fetchData()
},[])


  return (
    <div className="App">
      {useLocation().pathname !== "/" &&<Navbar/>}
      <Route exact path={"/"} component={Landing}/>
      <Route exact path={"/form"} component={Form}/>
      <Route exact path={"/dogs"} component={Dogs}/>
      <Route exact path={"/dogs/:id"} component={Details}/>
      {useLocation().pathname !== "/" &&<Footer/>}
    </div>
  );
}

export default App;
