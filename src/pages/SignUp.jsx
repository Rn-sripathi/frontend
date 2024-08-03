import { useState } from "react";
import { InputBox } from "../components/InputBox";
import Block from "../components/Block";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
      // TODO: Pagination for the inputBoxes
      // TODO: change the colors to match, increase the inputBox to match the button and give custom onChange colors to inputBox when focused.
      // TODO: Show if there is already an account in the db with the registered email, and show if the parameters are wrong (Tips: change the status to a series of 200's and check if the code form backend is the one you set if then show a custom response)
      const navigate = useNavigate();
      const [userSignUpDetails, setUserSignUpDetails] = useState({
            email: "",
            name: "",
            password: ""
      });
      console.log(userSignUpDetails);
      async function userSignUp() {
        const user = await axios.post("http://localhost:8081/api/auth/signup",userSignUpDetails);
        if(user.status == 200){
          localStorage.setItem("token", "Bearer "+user.data.token);
          localStorage.setItem("name", user.data.name);
          navigate("/home");
        }else{
          alert("Wrong credentials");
        }
      }
  return (
    <div className="w-full h-screen relative bg-white overflow-hidden flex flex-row items-start justify-end pt-[86px] px-[126px] pb-[85px] box-border leading-[normal] tracking-[normal] mq450:pl-5 mq450:pr-5 mq450:box-border mq800:pl-[63px] mq800:pr-[63px] mq800:box-border">
      <img
        className="h-full w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] max-w-full overflow-hidden max-h-full object-cover"
        alt=""
        src="/1321760.jpeg"
      />
      <Block
        ButtonText={"Sign up"}
        HeadderL1="Register"
        HeadderL2="Your Account"
        onButtonClick={userSignUp}
      >
        <InputBox type="text" placeholder="Email" onChange={(e) => {
            setUserSignUpDetails(prev => ({
                  ...prev,
                  email: e.target.value
            }))
        }}/>
        <InputBox type="text" placeholder="Name" onChange={(e) => {
            setUserSignUpDetails(prev => ({
                  ...prev,
                  name: e.target.value
            }))
        }}/>
        <InputBox type="password" placeholder="Password" onChange={(e) => {
            setUserSignUpDetails(prev => ({
                  ...prev,
                  password: e.target.value
            }))
        }}/>
      </Block>
    </div>
  );
};

export default SignUp;
