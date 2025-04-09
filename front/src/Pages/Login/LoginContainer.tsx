import { connect, ConnectedProps } from "react-redux";
import Login from "./Login";
import { FormEvent, HTMLAttributes, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { compose } from "redux";
import { RootState } from "../../store/rootReducer";
import authActions from "../../features/auth/authActions";
import { RoleType } from "../../features/user/userReducer";
import { authSelectors } from "../../features/auth/authSelector";

// Тип пропсів для компонента Login
export type LoginProps = HTMLAttributes<HTMLElement> & {
  
};

export type LoginContainerProps = HTMLAttributes<HTMLElement> & {
  isRegister:boolean;
  toggleForm:() => void;
  handleSubmit:(e: FormEvent<HTMLFormElement>) => void;
}

function LoginContainer({
  loginRequest,
  registerRequest,
  isLog,
}: ReduxPropsType): React.ReactElement {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLog) {
      navigate("/");
    }
  }, [isLog, navigate]);
  
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const toggleForm = () => {
    setIsRegister(!isRegister);
    setErrorMessage(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = {
      name: (form.elements.namedItem("name") as HTMLInputElement)?.value || "",
      email: (form.elements.namedItem("email") as HTMLInputElement)?.value || "",
      password: (form.elements.namedItem("password") as HTMLInputElement)?.value || "",
      phone: (form.elements.namedItem("phone") as HTMLInputElement)?.value || "",
      role: (form.elements.namedItem("role") as HTMLInputElement)?.value || "",
    };

    const { name, email, password, phone, role } = formData;
    console.log("formData", formData)

    try {
      if (!isRegister) {
        loginRequest(email, password)
      } else {
        registerRequest(name, password, email, phone, role as RoleType);
        setErrorMessage(null);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Произошла ошибка, попробуйте еще раз.");
    }
  };


  return (
    <Login
      isRegister={isRegister}
      toggleForm={toggleForm}
      handleSubmit={handleSubmit}
    />
  );
}

const mapStateToProps = (state: RootState) => ({
  isLog: authSelectors.getIsAuth(state),
});

const mapDispatchToProps = {
  ...authActions
};

const connector = compose(
  connect(mapStateToProps, mapDispatchToProps),
);

export type ReduxPropsType = ConnectedProps<typeof connector>;

export default connector(LoginContainer);
