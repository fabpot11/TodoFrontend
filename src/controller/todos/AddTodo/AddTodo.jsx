import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";


const Td = styled.td`
padding:10px;
text-align:center;
color: white;
font-family: 'cursive';
font-size: 28px;
width:300px;
`;
const Tr = styled.tr`
  color: white;
  font-family: 'cursive';
  font-size: 28px;
`;

const Th = styled.th`
  padding: 20px 90px;
  width:300px;
  color: white;
  font-family: 'cursive';
  font-size: 35px;
`;
const Table = styled.table`
  color: white;
`;



export const AddTodo = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [dat, setDat] = useState([]);
  useEffect(() => {
    geTdata();
  }, [id]);
  function geTdata() {
    // console.log('jfdddddfdsfdsfa',Todo);
    axios.get(`https://todoarpit.herokuapp.com/todo/${id}`).then((res) => {
      setDat([...res.data]);
    });
  }

  // console.log(Todo);
  const del = (e) => {
    axios.delete(`https://todoarpit.herokuapp.com/todo/${e._id}`).then((res) => {
      // console.log(res.data.deleteTodo._id)
      geTdata();
    });
  };

  const [obj, setObj] = useState({
    work: "",
    status: "",
    parentId: id,
  });
  const changing = (e) => {
    const { id, value } = e.target;
    setObj({
      ...obj,
      [id]: value,
    });
  };
  const Sub = (e) => {
    e.preventDefault();
    // console.log(obj)
    axios.post("https://todoarpit.herokuapp.com/todo", obj).then((res) => {
      geTdata();
      // console.log(res.data);
      setObj({
        work: "",
        status: "",
        parentId: id,
      });
    });
  };
  function ren() {
    navigate(`/`);
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
        Add Todo
      </h1>
      <h1
        style={{
          color: "white",
          border: "white",
          fontFamily: "cursive",
          cursor: "pointer",
        }}
        onClick={() => ren()}
      >
        Click me to go Home
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
          placeholder="Task"
          id="work"
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
          value={obj.work}
        />
        <input
          placeholder="Note"
          id="status"
          style={{
            color: "white",
            border: "1px solid white",
            fontFamily: "cursive",
            marginLeft: "1%",
            padding: "10px",
            borderRadius: "10px",
            fontSize: "20px",
          }}
          onChange={(e) => changing(e)}
          type={"text"}
          value={obj.status}
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
      <div
      style={{
        marginLeft: "20%",
        marginRight: "40%",
        marginTop: "2%",
      }}
    >
      <Table>
        <Tr>
          <Th>Task</Th>
          <Th>Note</Th>
          <Th>Delete</Th>
        </Tr>

        {dat.map((e) => {
          return (
            <>
              <Tr>
                <Td>{e.work}</Td>
                <Td>{e.status}</Td>
                <Td>
                  <button
                    onClick={() => {
                      del(e);
                    }}
                    style={{
                      color: "red",
                      border: "white",
                      fontFamily: "cursive",
                      fontSize: "28px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </Td>
              </Tr>
            </>
          );
        })}
      </Table>
    </div>



    </>
  );
};
