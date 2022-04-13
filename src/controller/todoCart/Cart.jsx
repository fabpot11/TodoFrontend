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

let imgArray = [
  "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/encouraging-quotes5-1607057436.jpg?crop=1xw:1xh;center,top&resize=980:*",
  "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/encouraging-quotes6-1607057437.jpg?crop=1xw:1xh;center,top&resize=980:*",
  "https://i0.wp.com/blog.rescuetime.com/wp-content/uploads/2017/12/time-isnt-the-main-thing.png?resize=1000%2C486&ssl=1",
  "https://i0.wp.com/blog.rescuetime.com/wp-content/uploads/2017/12/be-not-afraid-of-going-slowly.png?resize=768%2C384&ssl=1",
  "https://i0.wp.com/blog.rescuetime.com/wp-content/uploads/2017/12/concentrate-all-your-thoughts-upon-the-work-in-hand.png?resize=768%2C384&ssl=1",
  "https://i0.wp.com/blog.rescuetime.com/wp-content/uploads/2017/12/productivity-is-never-an-accident.png?resize=768%2C384&ssl=1",
  "https://i0.wp.com/blog.rescuetime.com/wp-content/uploads/2017/12/efficiency-is-doing-things-right.png?resize=768%2C384&ssl=1",
  "https://i0.wp.com/blog.rescuetime.com/wp-content/uploads/2017/12/amateurs-sit-and-wait.png?resize=768%2C384&ssl=1",
  "https://i0.wp.com/blog.rescuetime.com/wp-content/uploads/2017/12/it-is-not-enough-to-be-busy.png?resize=768%2C384&ssl=1",
  "https://image.shutterstock.com/image-photo/quote-best-inspirational-motivational-quotes-600w-1027042741.jpg",
  "https://i0.wp.com/blog.rescuetime.com/wp-content/uploads/2017/12/if-you-love-life-dont-waste-time.png?resize=768%2C384&ssl=1",
  "https://i0.wp.com/blog.rescuetime.com/wp-content/uploads/2017/12/take-rest.png?resize=768%2C384&ssl=1",
  "https://m.media-amazon.com/images/I/618mV3ssooL._SL1000_.jpg",
  "https://pbs.twimg.com/media/FLWnuH8WQAAi-mT.jpg:large",
  "https://i.pinimg.com/236x/23/ef/c6/23efc6ce9527597852ec12c8262164a3.jpg",
  "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/encouraging-quotes28-1607057443.jpg",
  "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/encouraging-quotes2-1607057438.jpg?crop=1xw:1xh;center,top&resize=980:*",
  "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/encouraging-quotes3-1607057436.jpg?crop=1xw:1xh;center,top&resize=980:*",
  "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/encouraging-quotes4-1607057436.jpg?crop=1xw:1xh;center,top&resize=980:*",
];
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export const Carts = () => {
  const [dat, setdat] = useState([]);
  const { id } = useParams();
  
  const [obj, setObj] = useState({
    name: "",
    img: imgArray[getRandomInt(imgArray.length)],
    userId:id
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
    axios.post("https://todoarpit.herokuapp.com/parent/", obj).then((res) => {
      
      geTdata();

      setObj({
        name: "",
        img: imgArray[getRandomInt(imgArray.length)],
        userId:id
      });
    });
  };

  const navigate = useNavigate();

  useEffect(() => {
    geTdata();
  }, []);

  function geTdata() {
    axios.get(`https://todoarpit.herokuapp.com/parent/${id}`).then((res) => {
      if(res.data.length === 1){
        alert('Click on images or text to make Your Todo 💓 ')
      }
      setdat(res.data);
    });
  }

  // console.log(cart)
  const del = (e) => {
    axios.delete(`https://todoarpit.herokuapp.com/parent/${e._id}`).then((res) => {
      geTdata();
    });
  };

  function ren(e) {
    navigate(`/todo/${e._id}`);
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
        Todo Carts
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
          placeholder="Title"
          id="name"
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
          value={obj.name}
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
