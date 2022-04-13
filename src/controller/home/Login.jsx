import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



export const Login = () => {
  const [obj, setObj] = useState({
    email:"",
    password:""
  });
  const changing = (e) => {
    const { id, value } = e.target;
    setObj({
      ...obj,
      [id]: value,
    });
  };
  // console.log(dispatch)
  const Sub = (e) => {
    e.preventDefault();
    axios.post("https://todoarpit.herokuapp.com/login", obj).then((res) => {
      
      console.log(res.data)
      setObj({
        email:"",
        password:""
      });
      ren(res.data)
    });
  };

  const navigate = useNavigate();



  function ren(e) {
    navigate(`/parent/${e._id}`);
  }

  return (
    <>
      <h1
        style={{
          color: "white",
          border: "white",
          fontFamily: "cursive",
        }}
      >
        Login to go Main page
      </h1>

      <form
        onSubmit={(e) => {
          Sub(e);
        }}
        style={{
          marginTop: "4%",
        }}
      >
        <input
          placeholder="email"
          id="email"
          style={{
            color: "white",
            border: "1px solid white",
            fontFamily: "cursive",
            padding: "10px",
            borderRadius: "10px",
            fontSize: "20px",
          }}
          onChange={(e) => changing(e)}
          type={"text"}
          value={obj.email}
        />

        <input
          placeholder="password"
          id="password"
          style={{
            color: "white",
            border: "1px solid white",
            fontFamily: "cursive",
            padding: "10px",
            borderRadius: "10px",
            fontSize: "20px",
          }}
          onChange={(e) => changing(e)}
          type={"password"}
          value={obj.password}
        />

        <input
          type={"submit"}
          style={{
            color: "white",
            marginLeft: "1%",
            border: "1px solid white",
            fontFamily: "cursive",
            padding: "10px",
            borderRadius: "10%",
          }}
          value={"Submit"}
        />
      </form>
<div style={{
  height:'100px'
}}></div>
      
    </>
  );
};
