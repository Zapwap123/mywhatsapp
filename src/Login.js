import React from "react";
import { Button } from "@material-ui/core";
import "./Login.css";
import { signInWithPopup } from "firebase/auth";
import { provider, auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionType } from "./reducer";

function Login() {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch({
          type: actionType.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div className='login'>
      <div className='login_container'>
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/598px-WhatsApp.svg.png'
          alt=''
        />
        <div className='login_text'>
          <h1>Sign in to WhatsApp</h1>
        </div>
        <Button type='submit' onClick={signIn}>
          Sign in With Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
