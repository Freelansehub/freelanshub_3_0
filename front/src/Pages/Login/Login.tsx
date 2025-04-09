
import LoginFormContainer from "./LoginFormContainer";
import { LoginContainerProps } from "./LoginContainer";

export default function Login({
    isRegister,
    toggleForm,
    handleSubmit,
    ...props
}: LoginContainerProps): React.ReactElement {
    
    return (
        <div data-testid="login-page" className="loginPage">
            <div className="form-wrapper">
                <h1>{isRegister ? "Реєстрація" : "Авторизація"}</h1>
                <LoginFormContainer
                    handleSubmit={handleSubmit}
                    isRegister={isRegister} 
                    toggleForm={toggleForm}
                />
            </div>
        </div>
    );
}
