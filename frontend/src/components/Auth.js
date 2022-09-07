function Auth (props) {
  return(
    <section className='auth'>
      <form className='auth__form' name='formLogin' type="submit" onSubmit={props.onSubmit} noValidate>
        <h2 className='auth__heading'>{props.title}</h2>
        <input
          className={`auth__input ${!props.isValidInputs.email && 'form__text_error'}`} type="email" name="email" placeholder="Email"
          minLength="2" maxLength="30" required value={props.values.email} onChange={props.onChange} 
        />
        <span className="title-input-error form__message-error">{props.errors.email}</span>
        <input
          className={`auth__input ${!props.isValidInputs.password && 'form__text_error'}`} type="password" name="password" placeholder="Пароль"
          required value={props.values.password} onChange={props.onChange} 
        />
        <span className="link-input-error form__message-error">{props.errors.password}</span>
        <button className={`auth__buttonSubmit ${!props.isValid && 'auth__buttonSubmit_disable'}`} type="submit" disabled={!props.isValid}>
          {props.buttonText}
        </button>
        {props.children}
      </form>
    </section>
  )
}

export default Auth