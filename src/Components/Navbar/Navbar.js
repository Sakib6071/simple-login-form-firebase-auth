import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import app from "../../firebase.init";

const Navbar = () => {
  const [user, setUser] = useState({});
  const auth = getAuth(app);
 
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
       
        
      } else {
        setUser({});
      }
    });
  }, []);
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
       
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <nav className=" bg-gray-600 text-white text-xl font-semibold py-3">
      <div className=" px-10">
        {
            user?.uid && <Link className="mx-2" to={"/home"}>
            Home
          </Link>
        }
        {user.uid ? (
          <Link to={'/'} onClick={handleLogout}>LogOut</Link>
        ) : (
          <Link className="mx-2" to={"/"}>
            LogIn
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
