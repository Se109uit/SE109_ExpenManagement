import React, { useState, useEffect } from "react";
// import { useHistory } from 'react-router-dom';
import { Form, FormControl, InputGroup, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { email,fb,gg } from "../../features/firebase/firebaseSlice";
import { useNavigate, Link } from 'react-router-dom';

import "./Login.css";

function Login() {
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.login.isLogin);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState();
  const [errorPassword, setErrorPassword] = useState();
  const [validated, setValidated] = useState(false);
  // const history = useHistory();

  console.log('Hello from ci/cd') 
  
  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleEmailSubmit(event) {
    event.preventDefault();
    // const form = event.currentTarget;
    // if (form.checkValidity()) {
    //   event.preventDefault();
    //   event.stopPropagation();
      if (username === "" && password === "") {
        setErrorEmail('Vui lòng nhập email');
        setErrorPassword('Vui lòng nhập mật khẩu');
        return;
      }
      else if (password === "" && username !== "") {
        setErrorPassword('Vui lòng nhập mật khẩu');
        setErrorEmail('');
        return;
      }
      else if (username === "" && password !== "") {
        setErrorEmail('Vui lòng nhập email');
        setErrorPassword('');
        return;
      }
      else {
        dispatch(email({ username: username, password: password }))
        // .then( res => {
        //   if (!res.error) {
        //     if (loginState)
        //     navigate('expense/accountinfor');
        //       else {
        //         setErrorEmail('Email không tồn tại hoặc mật khẩu không đúng');
        //         setErrorPassword('');
        //       }
        //     }
        //   else {
        //     setErrorEmail('Email không tồn tại hoặc mật khẩu không đúng');
        //     setErrorPassword('');
        //   }
        // });
      }
    // }

    // setValidated(true);
  }

  function handleFBSubmit(event) {
    event.preventDefault();
    dispatch(fb());
  }

  function handleGGSubmit(event) {
    event.preventDefault();
    dispatch(gg());
  }

  return (
    <div className="login-page">
    <div className="form-margin">
      <div className="container col-12 col-md-6 col-lg-4">
        <div className="">
          <h2 className="d-flex justify-content-center mt-5">
            Chào mừng trở lại!
          </h2>
          <div className="d-flex justify-content-center greeting-log">
            Bạn đã bỏ lỡ rất nhiều thứ!
          </div>
        </div>

        {/* Login form */}
        <Form className="pt-5" validated={validated} onSubmit={handleEmailSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>
              <div className="weight-label">
                Địa chỉ email
              </div>
              </Form.Label>
            <Form.Control
              required 
              type="email"
              placeholder="Email"
              className="py-2"
              onChange={handleUsernameChange}
            />
            <Form.Control.Feedback type="invalid">
              Hãy nhập một email chính xác
            </Form.Control.Feedback>
          </Form.Group>
          {errorEmail && <p className="error">{errorEmail}</p>}

          <Form.Label>
            <div className="weight-label">
              Mật khẩu
            </div>
            </Form.Label>
          <Form.Group className="mb-2" controlId="formBasicPassword">
                    <InputGroup className="">
                        <Form.Control
                        placeholder="Mật khẩu"
                        aria-label="Password"
                        type={showPassword ? "text" : "password"}
                        aria-describedby="basic-addon1"
                        onChange={handlePasswordChange}
                        required
                        />
                        <InputGroup.Text id="basic-addon1" className='bg-white' onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                                </svg>                                
                                ) : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                                <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
                                </svg>
                            }
                        </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                    {errorPassword && <p className="error">{errorPassword}</p>}

                    <Form.Text>
                    <div className='mb-3 d-flex justify-content-end'>
                        <Link 
                        to='forgotpassword'
                        className='some-purple-text text-decoration-none'
                        >Quên mật khẩu?</Link>
                    </div>
                    </Form.Text>


          <div className="d-grid gap-2">
            <button
              type="submit"
              className="button-login border-1 shadow"
            >
              Đăng nhập
            </button>
          </div>
        </Form>

        {/* Horizontal line */}
        <div className="d-flex w-100 mt-4">
          <hr className="my-3 w-100 border-1" />
          <span className="background-span position-absolute px-3 translate-middle-x background-or start-50 dark:text-white dark:bg-gray-900">
            Hoặc tiếp tục với
          </span>
        </div>

        <div className="d-flex justify-content-between">
          {/* Login with Google */}
          <div className="d-grid gap-2 mt-4">
            <button
              type="button"
              className="button-login-google shadow d-flex align-items-center justify-content-center"
              onClick={handleGGSubmit}
            >
              <img
                className=""
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/706px-Google_%22G%22_Logo.svg.png"
                alt="google-logo"
                height="20"
                width="20"
              />
              <a className="fa-gg text-decoration-none text-black pl-1">
                Google
              </a>
            </button>
          </div>

          {/* Login with Facebook */}
          <div className="d-grid gap-2 mt-4">
            <button
              type="button"
              className="button-login-facebook shadow d-flex align-items-center justify-content-center"
              onClick={handleFBSubmit}
            >
              <img
                className="mr-3 img-fluid"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Facebook_logo_36x36.svg/2048px-Facebook_logo_36x36.svg.png"
                alt="facebook-logo"
                height="20"
                width="20"
              />
              <a className="fa-gg text-decoration-none text-white pl-1">
                Facebook
              </a>
            </button>
          </div>
        </div>

        <div>
          <div className="d-flex justify-content-center mt-4">
            <span className="text-black">Bạn chưa có tài khoản?</span>
            <Link to="/signup" className='fa-gg some-purple-text text-decoration-none'> Đăng ký ngay</Link>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Login;
