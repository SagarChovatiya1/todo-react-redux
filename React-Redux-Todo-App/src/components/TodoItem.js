import axios from "axios";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import { AiFillEdit } from "react-icons/ai";
import { IoCheckmarkDoneSharp, IoClose } from "react-icons/io5";
import { toast } from "react-toastify";

const TodoItem = (props) => {
  const { item, updateTodo, removeTodo, completeTodo, getListCard } = props;


  const inputRef = useRef(true);

  const changeFocus = () => {
    inputRef.current.disabled = false;
    inputRef.current.focus();
  };


  const update = async (item, value, e) => {
    if (e.which === 13) {
      const data = await axios({
        method: 'POST',
        url: `http://localhost:8080/api/v1/edit/${item.id}`,
        data: { id: item.id, item: value }
      })
      if (data?.status) {
        //here 13 is key code for enter key
        toast.success(data.data.message)
        updateTodo({ id: item.id, item: value });
        getListCard();
        inputRef.current.disabled = true;
      }
    }
  };

  const handleCompleted = async (item) => {
    let intId=parseInt(item.id)
    const data = await axios({ 
      method: 'POST',
      url: `http://localhost:8080/api/v1/completed/${intId}`,
    })
    if (data?.status) {
      //here 13 is key code for enter key
      toast.success(data.data.message)
      completeTodo(item.id)
      getListCard();
    }
  }


  const handleRemove = async (item) => {
    console.log("item", item)
    const data = await axios({
      method: 'POST',
      url: `http://localhost:8080/api/v1/delete/${item}`,
    })
    if (data?.status) {
      console.log(data.data.data.id )
      toast(data.data.message)

      removeTodo(data.data.data.id)
      getListCard();
    }
  }

  return (
    <motion.li
      initial={{ x: "150vw", transition: { type: "spring", duration: 2 } }}
      animate={{ x: 0, transition: { type: "spring", duration: 2 } }}
      whileHover={{
        scale: 0.9,
        transition: { type: "spring", duration: 0.1 },
      }}
      exit={{
        x: "-60vw",
        scale: [1, 0],
        transition: { duration: 0.5 },
        backgroundColor: "rgba(255,0,0,1)",
      }}
      key={item.id}
      className="card"
    >
      <textarea
        ref={inputRef}
        disabled={inputRef}
        defaultValue={item.item}
        onKeyPress={(e) => update(item, inputRef.current.value, e)}
      />
      <div className="btns">
        <motion.button
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => changeFocus()}
        >
          {" "}
          <AiFillEdit />{" "}
        </motion.button>
        {item.completed === false && (
          <motion.button
            whileHover={{ scale: 1.4 }}
            whileTap={{ scale: 0.9 }}
            style={{ color: "green" }}
            onClick={() => handleCompleted(item)}
          >
            <IoCheckmarkDoneSharp />
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.9 }}
          style={{ color: "red" }}
          onClick={() => handleRemove(item.id)}
        >
          {" "}
          <IoClose />
        </motion.button>{" "}
      </div>
      {item.completed && <span className="completed">done</span>}
    </motion.li>
  );
};

export default TodoItem;
