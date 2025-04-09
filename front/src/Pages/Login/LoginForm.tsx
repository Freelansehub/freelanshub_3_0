import React from "react";
import { LoginFormProps, ReduxPropsType } from "./LoginFormContainer";

const LoginForm : React.FC< LoginFormProps> = ({
  isRegister,
  toggleForm,
  handleSubmit,
  ...props
})=> {
  return (
    <form data-testid="login-form" onSubmit={handleSubmit}>
      {isRegister && (
        <div className="form-group">
          <label htmlFor="name">Ім'я</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Введіть ім'я"
            required
            
          />
        </div>
      )}
      {isRegister && (
        <div className="form-group">
          <label htmlFor="name">Номер Телефону</label>
          <input
            type="phone"
            id="phone"
            name="phone"
            placeholder="Номер Телефону"
            required
          />
        </div>
      )}
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Введіть email"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Пароль</label>
        <input
          type="password"
          id="password"
          name="password"
          minLength={4}
          placeholder="Введіть пароль"
          required
        />
      </div>
      {isRegister && (
        <div className="form-group">
          <label htmlFor="role">Роль</label>
          <select
            name="role"
            id="role"
            required
          >
            <option value="">Оберіть роль</option>
            <option value="Клієнт">Клієнт</option>
            <option value="Фрілансер">Фрілансер</option>
          </select>
        </div>
      )}
      
      <button>
        {isRegister ? "Зареєструватися" : "Увійти"}
      </button>
      <p className="toggle-text">
        {isRegister ? "Вже є акаунт?" : "Немає акаунта?"}{" "}
        <span onClick={toggleForm}>
          {isRegister ? "Увійти" : "Зареєструватися"}
        </span>
      </p>
    </form>
  );
}

export default LoginForm;
