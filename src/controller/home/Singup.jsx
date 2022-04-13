import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Main = styled.div`
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 90%;
  margin-left: 5%;
  margin-top: 1%;
  padding: 10px;
`;

const Div = styled.div`
  width: 90%;
  margin-left: 5%;
  height: 450px;
  margin-top: 5%;
`;

const Img = styled.img`
  width: 100%;
  height: 70%;
  border-radius:10%;
  cursor: pointer;
`;
const P = styled.p`
  color: white;
  font-family: "cursive";
  font-size: 28px;
  cursor: pointer;
`;


export const Singup = () => {
  const [dat, setdat] = useState([]);
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
    axios.post("https://todoarpit.herokuapp.com/singup", obj).then((res) => {
      
      setObj({
        email:"",
        password:""
      });
      console.log(res.data)
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
        Singup to go Main page
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

      <Main>
        {dat.map((e) => {
          return (
            <Div key={e._id}>
              <Img src={e.img}  onClick={() => ren(e)} />

              <P onClick={() => ren(e)}>{e.name}</P>
              <button
                onClick={() => {
                  del(e);
                }}
                style={{
                  border: "white",
                  fontFamily: "cursive",
                  fontSize: "28px",
                  cursor: "pointer",
                  color:'red'
                }}
              >
                Delete
              </button>
            </Div>
          );
        })}
      </Main>








        






























      <div
        style={{
          marginBottom: "90px",
        }}
      ></div>
    </>
  );
};
