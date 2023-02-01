import React from "react";
import { useDispatch } from "react-redux";
import { logoutUserAction } from "../redux/auth";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom"

function Logout() {
    const dispatch = useDispatch();
    // const navigate = useNavigate();
  
    const handleLogout = (e) => {
        e.preventDefault();
      localStorage.removeItem('auth')
      localStorage.removeItem('token')
      window.location.href="/"
      dispatch(logoutUserAction())      
        // toast.success("logout successfully")
        // navigate('/');
      console.log("asdas")
    }

    return(<>
    <div className="logout_btn_main" style={{ textAlign: "end", marginRight: "10px" }}>
        <button className="child-btn" style={{
          width: "66px", height: "25px",
          border: 'solid 1px #bf91e1',
          borderRadius: ' 29px',
          fontFamily: 'cursive',
          background: '#271c6c',
          color: "white"
        }} onClick={handleLogout} >logout</button>
      </div>
    </>)
}

export default Logout