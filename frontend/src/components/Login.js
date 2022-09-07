import {useEffect} from 'react';
import Auth from './Auth.js';
import {useFormWithValidation} from './formValidation.js';

function Login (props) {
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
    </Auth>
  )
}

export default Login