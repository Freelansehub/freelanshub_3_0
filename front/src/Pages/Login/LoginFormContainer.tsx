import { connect, ConnectedProps } from "react-redux";
import React, { FormEvent, HTMLAttributes } from "react";
import LoginForm from './LoginForm';
import { compose } from "redux";
import { RootState } from "../../store/rootReducer";

// Типы пропсів для LoginForm
export type LoginFormProps = HTMLAttributes<HTMLElement> & {
  isRegister: boolean;
  toggleForm: () => void;
  handleSubmit:(e: FormEvent<HTMLFormElement>) => void;
};

// Типы пропсів для LoginFormContainer
export type LoginFormContainerProps = HTMLAttributes<HTMLElement> & {
  // Если есть другие пропсы, можно добавить их сюда
};

// Компонент LoginFormContainer, обернутый reduxForm
const LoginFormContainer: React.FC<ReduxPropsType & LoginFormProps> = ({
  isRegister,
  toggleForm,
  handleSubmit,
  ...props
}) => {
  return (
    <LoginForm
      {...props}
      isRegister={isRegister}
      toggleForm={toggleForm}
      handleSubmit={handleSubmit}
    />
  );
};

// mapStateToProps - здесь можно подключить состояние из Redux
const mapStateToProps = (state: RootState) => ({
  // Указываем состояние, если нужно
});

// mapDispatchToProps - здесь можно добавить действия для dispatch
const mapDispatchToProps = {};

// Подключение к Redux
const connector = compose(
  connect(mapStateToProps, mapDispatchToProps)
);

export type ReduxPropsType = ConnectedProps<typeof connector>;

// Экспорт компонента с подключением к Redux
export default connector(LoginFormContainer);
