import SignupForm from "./SignupForm";
import Interest from "./Interest";
import { useState } from "react";
import BackgroundFrame from "../Background";
import { NavLink } from 'react-router-dom';

export default function Signup () {
  const [userinfo, setUserinfo] = useState("")
  
  // 회원가입 페이지에서 next를 누르면 개인정보 갱신
  const getUserinfo = (userinfo) => {
    setUserinfo(userinfo)
    console.log(userinfo)
  }

  return (
    <BackgroundFrame left="35vw" right="30vw" height="90vh" top="5vh" bottom="5vh" fsize="1.3vw" mtop = "13vh"
      bg={
          userinfo === ""
          ? (
            <div>
              <NavLink to = "/login">Login</NavLink>
              <SignupForm getUserinfo={getUserinfo}></SignupForm>
            </div>
            )
            : <Interest userinfo={userinfo} />
      }
      ment1 = {userinfo ? "Selection" : "Sign Up"}
      ment2 = {userinfo ? "What do you do in your free time?" : "Already Member ?"}
      align_items = "center"
    />
  )
}
