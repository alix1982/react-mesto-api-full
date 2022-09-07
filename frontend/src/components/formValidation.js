import { useState, useCallback } from "react";

//хук управления формой
export function useForm() {
  const [values, setValues] = useState({});

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setValues({...values, [name]: value});
  };
  return {values, handleChange, setValues};
}

//хук управления формой и валидации формы
export function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isValidInputs, setIsValidInputs] = useState({});

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValidInputs({...isValidInputs, [name]: target.validity.valid })
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false, newIsValidInputs = {}) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
      setIsValidInputs(newIsValidInputs);
    },
    [setValues, setErrors, setIsValid, setIsValidInputs]
  );

  return { values, errors, isValid, isValidInputs, setValues, handleChange, resetForm, setIsValid, setIsValidInputs};
}