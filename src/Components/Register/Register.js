import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import app from "../../firebase.init";
import toast from 'react-hot-toast'


const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const Register = () => {
  const [email,setEmail] = useState({value:'',error:''})
  const [password,setPassword] = useState({value:'',error:''})
  const [confirmPassword,setConfirmPassword] = useState({value:'',error:''})
  console.log(email);
  console.log(password);
  console.log(confirmPassword);
  const navigate = useNavigate();
  const auth = getAuth(app);
/*   const facebookSignIn = () => {
    signInWithPopup(auth, facebookProvider)
  .then((result) => {
    // The signed-in user info.
    const user = result.user;

    console.log(user);

    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);

    // ...
  });
  } */
  const googleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log(result.user);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if(email.value ===''){
      setEmail({value:'',error:'Email is required'})
    }
    if(password.value ===''){
      setPassword({value:'',error:'Password is required'})
    }
    if(confirmPassword.value ===''){
      setConfirmPassword({value:'',error:'Confirm password is required'})
    }
    
    if(email.value && password.value && confirmPassword.value){
      createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((result) => {
        // Signed in
        const user = result.user;
        navigate('/home')
        toast.success('User Registered',{id:1})
        toast.success('Successfully LogIn',{id:2})
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorMessage.includes('email-already-in-use')){
          toast.error('User Exist',{id:'1'})
        }
        else{
          toast.error(errorMessage,{id:'2'})
        }
       
        // ..
      });
    }
  };
  const handleConfirmPassword=(confirmPasswordValue)=>{
    if(password.value==confirmPasswordValue){
      setConfirmPassword({value:confirmPasswordValue,error:''})
    }
    else if((password.value).length<6){
      setConfirmPassword({value:'',error:'Do correct the password'})
    }
    else{
      setConfirmPassword({value:'',error:'Not match'})
    }
      
  }
  const handlePassword=(passwordValue)=>{
    if(passwordValue.length <6){
      setPassword({value:'',error:'Password too short'})
    }
    else{
      setPassword({value:passwordValue,error:''})
    }
      
  }
  const handleEmail=(emailValue)=>{
    if(/^\S+@\S+\.\S+$/.test(emailValue)){
      setEmail({value:emailValue,error:''})
    }else{
      setEmail({value:'',error:'Invalid Email'})
    }
  }
  return (
    <div>
      <div className="mt-5 w-2/5 mx-auto bg-gray-700 rounded-lg px-10 py-8">
        <p className="text-center text-3xl text-yellow-500">Register Here</p>
        <form onSubmit={handleFormSubmit}>
          <div className="email-field">
            <label className="text-white text-xl">Enter Your Email</label>{" "}
            <br />
            <input onBlur={(event)=>handleEmail(event.target.value)}
              className=" px-2 py-3 w-full rounded-lg"
              type="email"
              placeholder="Your Email"
              name="email"
            />
            {
              email?.error && <p className="text-red-500 italic">{email.error}</p>
            }
          </div>

          <div className="password-field my-5">
            <label className="text-white text-xl">Set Password</label> <br />
            <input onBlur={(event)=>handlePassword(event.target.value)}
              className=" px-2 py-3 w-full rounded-lg"
              type="password"
              name="password"
              placeholder="Password"
            />
            {
              password?.error && <p className="text-red-500 italic">{password.error}</p>
            }
          </div>

          <div className="confirm-password-field">
            <label className="text-white text-xl">Confirm Password</label>{" "}
            <br />
            <input onChange={(event)=>handleConfirmPassword(event.target.value)}
              className=" px-2 py-3 w-full rounded-lg"
              type="password"
              placeholder="Retype Password"
            />
            {
              confirmPassword?.error && <p className="text-red-500 italic">{confirmPassword.error}</p>
            }
          </div>

          <div className="register-button mt-5 text-right">
            <input
              className="hover:cursor-pointer w-full bg-yellow-500 text-black px-5 py-2 text-xl font-semibold rounded-lg"
              type="submit"
              value="Register"
            />
          </div>
        </form>
        <div className="already-account mt-2 mb-5">
          <p className=" text-gray-300">
            Already have an account?{" "}
            <Link className="text-yellow-500" to={"/"}>
              Login
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
          <button
            onClick={googleSignIn}
            className="text-white py-3 px-2 my-2 text-left w-full border-2 rounded-lg"
          >
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
{/*         <div className="sign-in-facebook">
          <button
            onClick={facebookSignIn}
            className="text-white py-3 px-2 my-2 text-left w-full border-2 rounded-lg"
          >
            <FontAwesomeIcon
              className=" w-1/6 inline-block text-left"
              icon={faFacebook}
              size={"xl"}
            ></FontAwesomeIcon>
            <span className="text-center w-5/6 mx-auto inline-block ">
              Continue With Facebook
            </span>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Register;
