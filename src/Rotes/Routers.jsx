import { Route, Routes } from "react-router-dom";
import { MainSl } from "../controller/home/ShowHome";
import { Carts } from "../controller/todoCart/Cart";
import { AddTodo } from "../controller/todos/AddTodo/AddTodo";
export const Rout = () => {
  // console.log(3213);
  return (
    <>
    
      <Routes>
        <Route path="/todo/:id" element={<AddTodo />} />
        <Route path="/parent/:id" element={<Carts />} />
        <Route path="/" element={<MainSl/>} />
      </Routes>
    </>
  );
};
