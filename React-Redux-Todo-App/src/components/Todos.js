import React, { useState } from "react";
import { connect } from "react-redux";
import { addTodos, listTodos } from "../redux/reducer";
import { GoPlus } from "react-icons/go";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)),
    listTodos:(obj)=>dispatch(listTodos(obj))
  };
};

const Todos = (props) => {
  const [todo, setTodo] = useState("");
  const tokens = localStorage.getItem("token")
  const token = JSON.parse(tokens)
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const add = async () => {
    if (todo === "") {
      alert("Input is Empty");
    } else {

      await axios({
        method: 'POST',
        url: 'http://localhost:8080/api/v1/create',
        headers: { "token": `${token}` },
        data: {
          id: Math.floor(Math.random() * 1000),
          item: todo,
          completed: false
        },
      }).then(result => {
        if (result?.status) {
          // console.log("todo r",result?.data?.findUser)
          props.addTodo({
            id: result?.data?.findUser.id,
            item: result?.data?.findUser.title,
            completed: JSON.parse(result?.data?.findUser.completed),
          });
          toast.success(result?.data?.message)
          setTodo("");
        }
      })
        .catch(err => {
          toast.error("get error")
        })

    }
  };

  const getListCard = async () => {
   const result = await axios({
      method: 'GET',
      url: "http://localhost:8080/api/v1/listnotes",
      headers: { "token": `${token}` },
    }) 
    result.data.data.map((val,id)=>(
      props.listTodos({id:val.id,
        item:val.title,
        completed: JSON.parse(val.completed)
        })
     
    ))

  }
  React.useEffect(() => {
    getListCard()
  }, [])



  return (
    <div className="addTodos">
      <input
        type="text"
        onChange={(e) => handleChange(e)}
        className="todo-input"
        value={todo}
      />

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="add-btn"
        onClick={() => add()}
      >
        <GoPlus />
      </motion.button>
      <br />
    </div>
  );
};
//we can use connect method to connect this component with redux store
export default connect(mapStateToProps, mapDispatchToProps)(Todos);
