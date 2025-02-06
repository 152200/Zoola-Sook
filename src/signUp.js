import { useState, React } from "react";
import axios from "axios";
import './style.css'
import TopBar from "./components/top-bar";
import {toast} from 'react-toastify'
import { BASE_NAME } from "./config/basename";
import { API_BASE_URL } from "./config/api";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("hello.from@gmail.com");
  const [password, setPassword] = useState("123456789");
  const [passwordr, setPasswordr] = useState("123456789");
  const [accept, setAccept] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [city, setCity ] = useState("");
  const [town, setTown ] = useState("");
  const [phone, setPhone ] = useState("");

  async function Submit(e) {
    let flag = true;
    e.preventDefault(); //to prevent submit before checking
    setAccept(true);
    if (name === "" || password.length < 8 || password !== passwordr) {
      flag = false;
    } else {
      flag = true;
    }

    try {
      if (flag) {
        // send data
        let res = await axios.post(`${API_BASE_URL}/users/register`, {
          name: name,
          email: email,
          password: password,
          phone: phone,
          isAdmin:false,
          street:city,
          apartment:town,
          
        });
        // console.dir(res)
        if (res.status === 200) {
          toast.success("تم تسجيل المستخدم");
          if(BASE_NAME.length > 0)
          window.location.pathname = `/${BASE_NAME}/LogIn`;
          else 
           window.location.pathname = '/LogIn';
        }
        else if(res.status === 422){
            setEmailError(422);
        }
      }
    } catch (err) {
      setEmailError(err.response.status);
      // toast("failed to regist");
    }
  }

  return (
    <div>
      <TopBar/>
    <div className="parent">
      <div className="register">
        <form onSubmit={Submit}>
          <label htmlFor="name">الاسم</label>
          <input
            id="name"
            type="text"
            placeholder="Name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {name === "" && accept && (
            <p className="error">Username is Required</p>
          )}
          <label htmlFor="mail">البريد الإلكتروني</label>
          <input
            type="email"
            id="email"
            placeholder="Email..."
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {accept && emailError === 422 && <p style={{color:"red", fontSize:'13px'}}>email is already been taken</p>}
          <label htmlFor="password">كلمة السر</label>
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
          
          <label htmlFor="repeat-password">تأكيد كلمة المرور</label>
          <input
            type="password"
            id="repeat-password"
            value={passwordr}
            onChange={(e) => setPasswordr(e.target.value)}
          />
          {passwordr !== password && accept && (
            <p className="error">does not match</p>
          )}
          {/* phone number .............................. */}
          <label htmlFor="phone">رقم الهاتف</label>
          <input
            type="text"
            required
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {phone.length < 10 && accept && (
            <p className="error">must be 10 digits</p>
          )}

          {/* City .......................................*/}

          <label htmlFor="city">المحافظة</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          {city.length < 4 && accept && (
            <p className="error">reuired</p>
          )}

          {/* Town .......................................*/}

          <label htmlFor="town">البلدة /أو موقع الإقامة</label>
          <input
            type="text"
            id="town"
            value={town}
            onChange={(e) => setTown(e.target.value)}
          />
          {town.length < 3 && accept && (
            <p className="error">Enter a valid name</p>
          )}
          <div style={{ textAlign: "center" }}>
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}
