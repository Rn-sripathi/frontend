import { useState } from "react";
import Block from "../components/Block";
import { InputBox } from "../components/InputBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  // TODO: Show if the password was in correct on the frontend, and also if the account is not there 
  const navigate = useNavigate();
  const [userSignInDetails, setUserSignInDetails] = useState({
    email: "",
    password: "",
  });
  async function userSignIn() {
    const newUser = await axios.post(
      "http://localhost:8081/api/auth/signin",
      userSignInDetails
    );
    if (newUser.status === 200) {
      localStorage.setItem("token", "Bearer " + newUser.data.token);
      localStorage.setItem("name", newUser.data.name);
      navigate("/home");
    } else {
      alert("sign in error");
    }
  }
  console.log(userSignInDetails);
  return (
    <div className="w-full h-screen relative bg-white overflow-hidden flex flex-row items-start justify-end pt-[86px] px-[126px] pb-[85px] box-border leading-[normal] tracking-[normal] mq450:pl-5 mq450:pr-5 mq450:box-border mq800:pl-[63px] mq800:pr-[63px] mq800:box-border">
      <img
        className="h-full w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] max-w-full overflow-hidden max-h-full object-cover"
        alt=""
        src="/group-10081@2x.png"
      />
      <Block
        ButtonText={"Sign in"}
        HeadderL1="Sign Into"
        HeadderL2="Your Account"
        onButtonClick={userSignIn}
      >
        <InputBox
          type="text"
          placeholder="Email"
          onChange={(e) => {
            setUserSignInDetails((prev) => ({
              ...prev,
              email: e.target.value,
            }));
          }}
        />
        <InputBox
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setUserSignInDetails((prev) => ({
              ...prev,
              password: e.target.value,
            }));
          }}
        />
      </Block>
    </div>
  );
};

export default SignIn;
