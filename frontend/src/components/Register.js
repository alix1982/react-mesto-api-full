import {useEffect} from 'react';
import Auth from './Auth.js';
import { Link } from 'react-router-dom';
import {useFormWithValidation} from './formValidation.js';

function Register (props) {
  const { values, errors, isValid, isValidInputs, setIsValidInputs, handleChange, resetForm } = useFormWithValidation();

  useEffect(()=>{
    resetForm();
    setIsValidInputs({
      email: true,
      password: true
    })
  }, [props.isOpen])

  function handleSubmit (e) {
    e.preventDefault();
    props.onApi(values.password, values.email);
  }

  return(
    <Auth title = {props.title} buttonText = {props.buttonText} onSubmit={handleSubmit} onChange={handleChange}
      values={values} errors={errors} isValid={isValid} isValidInputs={isValidInputs}
    >
      <p className="auth__text">
        Уже зарегистрированы?
        <Link to="/sign-in" className="auth__link" > Войти</Link>
      </p>
    </Auth>
  )
}

export default Register