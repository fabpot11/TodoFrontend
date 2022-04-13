import { useEffect } from "react";
import { Login } from "./Login";
import  { Singup } from './Singup'
export const MainSl = () => {
 
  useEffect(()=>{
    alert('Demo Login email = a@a.com ans Pass = 1234')
  },[])
    
  return (
    <>
    <h1
    style={{
      color: "white",
      border: "white",
      fontFamily: "cursive",
      marginBottom:"70px"
    }}
  >
  Todo App
  </h1>
    <Login/>
    <Singup/>
    
    </>
  );
};
