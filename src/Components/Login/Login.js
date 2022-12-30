import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import app from "../../firebase.init";
import toast from 'react-hot-toast'

const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const navigate = useNavigate()
  const auth = getAuth(app)
  const googleSignIn=()=>{
    signInWithPopup(auth,googleProvider)
    .then(result => {
      console.log(result.user);
      navigate('/home')
    })
    .catch(err=>{
      console.log(err.message);
    })
  }
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    const email = e.target.email.value;
    signInWithEmailAndPassword(auth, email, password)
  .then((result) => {
    // Signed in 
    const user = result.user;
    navigate('/home')
    toast.success('Successfully Logged In',{id:'1'})
    console.log(user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    if(errorMessage.includes("wrong-password")){
      toast.error('Wrong Password',{id:'2'})
    }
    else if (errorMessage.includes('user-not-found')){
      toast.error('User not exist',{id:'3'})
    }
    else{
      console.log(errorMessage);
    }
  });
  };
  return (
    <div>
      <div className="mt-5 w-2/5 mx-auto bg-gray-700 rounded-lg px-10 py-8">
        <p className="text-center text-3xl text-yellow-500">Login Here</p>
        <form onSubmit={handleFormSubmit}>
          <div className="email-field">
            <label className="text-white text-xl">Enter Your Email</label>{" "}
            <br />
            <input
              className=" px-2 py-3 w-full rounded-lg"
              type="email"
              placeholder="Your Email"
              name="email"
            />
          </div>

          <div className="password-field my-5">
            <label className="text-white text-xl">Enter Password</label> <br />
            <input
              className=" px-2 py-3 w-full rounded-lg"
              type="password"
              placeholder="Password"
              name="password"
            />
          </div>

          <div className="login-button mt-5 text-right">
            <input
              className="hover:cursor-pointer w-full bg-yellow-500 text-black px-5 py-2 text-xl font-semibold rounded-lg"
              type="submit"
              value="Login"
            />
          </div>
        </form>
        <div className="new-user mt-2 mb-5">
          <p className=" text-gray-300">
            New here? <Link className="text-yellow-500" to={"/register"}>
              Register
            </Link>
          </p>
        </div>
        <div className="or w-4/5 mx-auto mb-5">
          <hr className=" w-2/5 inline-block" />
          <span className="text-center text-gray-300 inline-block w-1/5">
            or
          </span>
          <hr className=" w-2/5 inline-block" />
        </div>
        <div className="sign-in-google">
          <button onClick={googleSignIn} className="text-white py-3 px-2 my-2 text-left w-full border-2 rounded-lg">
            <FontAwesomeIcon
              className=" w-1/6 inline-block text-left"
              icon={faGoogle}
              size={"xl"}
            ></FontAwesomeIcon>
            <span className="text-center w-5/6 mx-auto inline-block ">
              Continue With Google
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
