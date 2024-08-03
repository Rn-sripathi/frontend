import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Start = () => {
      const navigate = useNavigate();
      const token = localStorage.getItem("token");
      useEffect(() => {
            if(!token){
                  navigate("/signin");
            }else {
                  navigate("/home");
            }
      }, [token, navigate])
      return(
            <div></div>
      );
}


export default Start;