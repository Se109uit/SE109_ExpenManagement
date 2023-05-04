import React, { useState } from 'react';
import { Form, FormControl, InputGroup, Button } from 'react-bootstrap';
import './Login.css'
import { useNavigate, Link } from 'react-router-dom';
import DatePicker from '../DatePicker/DatePicker';


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // const history = useHistory();
    function handleEmailSubmit(event) {
        event.preventDefault();
        dispatch(email({ username, password }));
    }

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    const [value, onChange] = useState(new Date());

    return (
        <div className=''>
            <div className='container col-12 col-md-3 col-lg-3'>
                <div className=''>
                <h2 className='d-flex justify-content-center mt-5'>Chào người dùng mới!</h2>
                <div className='d-flex justify-content-center '>Chào mừng bạn đến với ứng dụng</div>
                </div>

                {/* Login form */}
                <Form className='pt-5'>
                <Form.Group className="mb-3" controlId="formBasicText">
                    {/* <Form.Label>Một mã bộ máy:</Form.Label> */}
                    <Form.Control type="text" placeholder="Họ Tên" className='py-2' />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    {/* <Form.Label>Địa chỉ Email:</Form.Label> */}
                    <Form.Control type="email" placeholder="Email" className='py-2' />
                </Form.Group>

                <div className='d-flex justify-content-around mb-3'>
                    {/* Male */}
                    <div className='d-grid gap-2 hover-mafe'>
                        <div className=''>
                            <p className='text-center'>Nam</p>
                        </div>
                        <img src="src/assets/male.png" className="mafe" alt="" />
                    </div>

                    {/* FeMale */}
                    <div className='d-grid gap-2 hover-mafe'>
                        <div className=''>
                            <p className='text-center'>Nữ</p>
                        </div>
                        <img src="src/assets/female.png" className="mafe" alt="" />
                    </div>
                </div>

                {/* Date time picker */}
                <Form.Group className="mb-3" controlId="formDatePicker">
                    <DatePicker className="w-full"></DatePicker>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    {/* <Form.Label>Mật khẩu:</Form.Label> */}
                    <InputGroup>
                        <Form.Control
                        placeholder="Mật khẩu"
                        aria-label="Password"
                        type={showPassword ? "text" : "password"}
                        aria-describedby="basic-addon1"
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

                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                    {/* <Form.Label>Xác nhận mật khẩu:</Form.Label> */}
                    <InputGroup>
                        <Form.Control
                        placeholder="Xác nhận mật khẩu"
                        aria-label="Password"
                        type={showPassword ? "text" : "password"}
                        aria-describedby="basic-addon1"
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

                <div className='d-grid gap-2'>
                    <button type="submit" className="button-login border-1 shadow">
                        Đăng ký
                    </button>
                </div>
                </Form>

                <div>
                    <div className='d-flex justify-content-center mt-4'>
                        <span className='text-black'>Đã có tài khoản?</span>
                        <Link to="/" className='fa-gg some-purple-text text-decoration-none'> Đăng nhập ngay</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
