

import { connect, ConnectedProps } from "react-redux";
import AuthForm from "../../../components/Auth/AuthForm";
import { RootState } from "../../../redux/rootReducer";
import { LoginContainerProps } from "./LoginContainer";
import { compose } from "redux";
import authActions from "../../../features/auth/authActions";

const mapStateToProps = (state: RootState) => {
    return {

    };
}

type FormType = {
    email: string, 
    password: string,
}

const conect = connect(mapStateToProps, {
    ...authActions
});

type ReduxPropsType = ConnectedProps<typeof conect>

export default function Login({
    loginRequest,
    ...props
}: LoginContainerProps & ReduxPropsType): React.ReactElement {

    const handleSabmit = (data: FormType) => {
        loginRequest(data);
        console.log("Login data: ", data);
    }

    return (
        <div data-testid="login-page" className="loginPage">
            <AuthForm<FormType>
                title="Login"
                submitButtonText="Login"
                submitForm={handleSabmit}
                fields={[
                    { 
                        name: "email", 
                        label: "Email", 
                        type: "email", 
                        poleType: 'input',
                        validation:{
                            required:{value:true, message:"required"}
                        }
                    },
                    { 
                        name: "password", 
                        label: "Password", 
                        type: "password",
                        poleType: 'input',
                        validation:{
                            required:{value:true, message:"required"}
                        } 
                    },
                ]}
            />
        </div>
    );
}


const hocs = compose(
    conect,
)(Login);

export type LoginProps = React.ComponentProps<typeof hocs>;

