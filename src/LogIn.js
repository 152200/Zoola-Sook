import { useState ,useEffect, useContext,createContext} from "react";
import axios from "axios";
import './style.css';
import {Link ,useNavigate ,Navigate} from 'react-router-dom'
import TopBar from "./components/top-bar";
import {Context} from './index.js';
import {toast} from 'react-toastify';
import { BASE_NAME } from "./config/basename.js";
import { API_BASE_URL } from "./config/api.js";

// // Create the context
// export const AuthContext = createContext();

// // Create the provider component
// const AuthProvider = (Auth,usero) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);


//   useEffect(()=>{
//     setIsAuthenticated(Auth);
//     setUser(usero)
//   },[isAuthenticated])

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
//       <TopBar/>
//     </AuthContext.Provider>
//   );
// };

export default function LogIn() {
  
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accept, setAccept] = useState(false);
  const [emailError, setEmailError] = useState("");

  // useEffect(()=>{},[isAuthenticated])

  async function Submit(e) {


    e.preventDefault(); 

    // after login 

    let flag = true;
    setAccept(true);
    if (password.length < 8) {
      flag = false;
    } else {
      flag = true;
    }
    // if the password match the length

      if(flag){
      const fetchUser = async () => {
      
        try {
          const res = await axios.post(
            `${API_BASE_URL}/users/login`,
            // {
            //   withCredentials: true,
            // },
            {
              email: email,
              password: password,
            }
          );
    
          // Handle login Success
    
          if (res.status === 200) {
            
            
           
             // Handle Login Success Authentication 

             setIsAuthenticated(true);
             setUser(res.data.user);
             console.log(res.data)
             toast.success("تم تسجيل الدخول" ,{
              autoClose:5000
            })
            window.location.pathname = `/${BASE_NAME}`;
        } else  {
           
            setEmailError("Unprocessable entity - 422");
            console.log('Failure: Unprocessable entity');
        }   
        
        } catch (err) {
    
          // Handle Error Authentication.......................
          toast.error('إما كلمة المرور أو البريد خاطئ')
          setIsAuthenticated(false);
          setUser({});
    
            // Handle Error....................................
          if (err.response) {
            // If there's a server response, handle it
            setEmailError(err.response.data || "Login failed");
            console.log('Login failed:', err.response.data);
        } else {
            // If no response, log the error
            console.error('Error:', err);
        }
         
        }
      };

      fetchUser();
    }
  }


  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
    <TopBar/>
    <div className="parent">
      <div className="register">
        <form onSubmit={Submit}>
          <label htmlFor="mail">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email..."
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {accept && emailError === 422 && <p>email is already been taken</p>}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            required
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {password.length < 8 && accept && (
            <p className="error">must be more than 8 Char</p>
          )}
          
          <div style={{ textAlign: "center" }}>
            <button type="submit">LogIn</button>
          </div>
              <br/>
              <Link className="do-not-have-account" to="/SignUp" style={{}}><span>لا تملك حسابا, ادخل بياناتك</span></Link>
        </form>
      </div>
    </div>
    </div>
  );
}
