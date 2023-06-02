import React, {useState, useEffect} from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import './ForgotPassword.css';
import { updatePassword } from "firebase/auth";
import {auth} from '../../features/firebase/firebase';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

// import { MyPPassword } from '../SmallFunction/MyPPassword';
import changePass from '../../assets/change-pass.png'
import './resetPassword.css'

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [validatedPassword, setValidatedPassword] = useState(false);
    const [validatedNewPassword, setValidatedNewPassword] = useState(false);
    const [validatedPasswordConfirm, setValidatedPasswordConfirm] = useState(false);
    const [validated, setValidated] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    const [passwordConfirmError, setPasswordConfirmError] = useState('');
    
    const { t } = useTranslation()

    function handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
            if (newPassword !== passwordConfirm) {
                setError(t('resetpassword.matkhaukhongkhop'));
                return;
            }
            else if (password === newPassword) {
                setError(t('resetpassword.matkhaumoikhongduoctrungmatkhaucu'));
                return;
            }
            else if (newPassword !== passwordConfirm) {
                setError(t('resetpassword.matkhaukhongkhop'));
                return;
            }
            else if (newPassword.length < 6) {
                setError(t('resetpassword.matkhauphaicoitnhat6kytu'));
                return; 
            }
            else {
                updatePassword(auth.currentUser, newPassword).then(() => {
                    navigate('/expense/home');
                }).catch((error) => {
                    setError(error.message);
                });
            }
    }

    function handleShowPassword() {
      setShowPassword(!showPassword);
    }

    function handlePasswordChange(e) {
      setPassword(e.target.value);
    }

    function handleNewPasswordChange(e) {
      setNewPassword(e.target.value);
    }

    function handleConfirmPasswordChange(e) {
      setPasswordConfirm(e.target.value);
    }

  return (
    <div className='ResetPassword'>

    <Form className='container mt-5 forgot-pass' noValidate validated={validated} onSubmit={handleSubmit}>
      <div className="">
          <p className="titlePass fs-2 fw-bold d-flex justify-content-center mt-5">
          <img className='changePass' src={changePass}/>
          {t('resetpassword.doimatkhau')}
          </p>
          <div className="d-flex justify-content-center greeting-log mb-4">
          <p className='titlePass fs-6 fw-bold'>{t('resetpassword.vuilongnhapmatkhauhientai')}</p>
          </div>
        </div>
        <Form.Label>
          <div className="weight-label">
          <p className='titlePass fs-6 fw-bold'>{t('resetpassword.matkhau')}</p>
          </div>
        </Form.Label>
        <Form.Group className="mb-2" controlId="formBasicPassword">
          <InputGroup className="groupPass">
              <Form.Control
              placeholder={t('resetpassword.matkhau')}
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
        <Form.Label>
          <div className="weight-label">
          <p className='titlePass fs-6 fw-bold'>{t('resetpassword.matkhaumoi')}</p>
          </div>
        </Form.Label>
        <Form.Group className="mb-2" controlId="formBasicPassword">
          <InputGroup className="groupPass">
              <Form.Control
              placeholder={t('resetpassword.matkhaumoi')}
              aria-label="Password"
              type={showPassword ? "text" : "password"}
              aria-describedby="basic-addon1"
              onChange={handleNewPasswordChange}
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
        <Form.Label>
          <div className="weight-label">
          <p className='titlePass fs-6 fw-bold'>{t('resetpassword.nhaplaimatkhaumoi')}</p>
          </div>
        </Form.Label>
        <Form.Group className="mb-2" controlId="formBasicPassword">
          <InputGroup className="groupPass">
              <Form.Control
              placeholder={t('resetpassword.matkhau')}
              aria-label="Password"
              type={showPassword ? "text" : "password"}
              aria-describedby="basic-addon1"
              onChange={handleConfirmPasswordChange}
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
          
          {/* <Form.Control.Feedback type="invalid">
              {error}
          </Form.Control.Feedback> */}
        </Form.Group>

        <div>
          <p className='error'>{error}</p>
        </div>

      <Button 
      variant="primary" 
      type="submit"
      className='d-block mx-auto mt-3'
      >
        {t('resetpassword.luu')}
      </Button>
    </Form>
    </div>
  );
}

export default ForgotPassword;
