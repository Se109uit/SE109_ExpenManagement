import React, { useState } from "react";
// import { useHistory } from 'react-router-dom';
import { Button, Form } from "react-bootstrap";
import "./Login.css";
import { useSelector, useDispatch } from "react-redux";
import { email,fb,gg } from "../../features/firebase/firebaseSlice";

function Login() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const history = useHistory();

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }
  function handleEmailSubmit(event) {
    event.preventDefault();
    dispatch(email({ username, password }));
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
    <div className="">
      <div className="container col-12 col-md-4 col-lg-4">
        <div className="">
          <h2 className="d-flex justify-content-center mt-5">
            Chào mừng trở lại!
          </h2>
          <div className="d-flex justify-content-center ">
            Bạn đã bỏ lỡ rất nhiều thứ!
          </div>
        </div>

        {/* Login form */}
        <Form className="pt-5">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            {/* <Form.Label>Địa chỉ Email:</Form.Label> */}
            <Form.Control
              type="email"
              placeholder="Email"
              className="py-2"
              onChange={handleUsernameChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            {/* <Form.Label>Mật khẩu:</Form.Label> */}
            <Form.Control
              type="password"
              placeholder="Mật khẩu"
              className="py-2"
              onChange={handlePasswordChange}
            />

            <Form.Text>
              <div className="mt-2 d-flex justify-content-end">
                <a
                  href="/forgot-password"
                  className="some-purple-text text-decoration-none"
                >
                  Quên mật khẩu?
                </a>
              </div>
            </Form.Text>
          </Form.Group>

          <div className="d-grid gap-2">
            <button
              type="submit"
              className="button-login border-1 shadow"
              onClick={handleEmailSubmit}
            >
              Đăng Nhập
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

        {/* Login with Google */}
        <div className="d-flex justify-content-between">
          <div className="d-grid gap-2 mt-4">
            <button
              type="button"
              className="button-login-google border shadow d-flex align-items-center justify-content-center"
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
              className="button-login-facebook border shadow d-flex align-items-center justify-content-center"
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
            <a
              href="/signup"
              className="fa-gg some-purple-text text-decoration-none"
            >
              Đăng ký ngay
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
