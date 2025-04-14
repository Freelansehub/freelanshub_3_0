

import { connect, ConnectedProps } from "react-redux";
import AuthForm from "../../../components/Auth/AuthForm";
import { RootState } from "../../../store/rootReducer";
import { compose } from "redux";
import { HTMLAttributes } from "react";
import authActions from "../../../features/auth/authActions";
import { RoleType } from "../../../features/user/userReducer";

export type RegisterPropsType = HTMLAttributes<HTMLElement> & {
  
};

type FormType = {
    name:string, 
    email: string, 
    password: string, 
    phone:string,
    role:RoleType 
}

const mapStateToProps = (state: RootState) => {
    return {

    };
}

const conectRedux = connect(mapStateToProps, {...authActions});

type ReduxPropsType = ConnectedProps<typeof conectRedux>

function Register({
    registerRequest,
    ...props
}: RegisterPropsType & ReduxPropsType): React.ReactElement {

    const handleSabmit = (data: FormType) => {
        console.log(data)
        console.log("registerRequest", registerRequest);
        registerRequest(data)
        console.log(window)
    }

    return (
        <div data-testid="login-page" className="loginPage">
            <AuthForm<FormType>
                title="Register"
                submitButtonText="Register"
                submitForm={handleSabmit}
                fields={[
                    { 
                        name: "name", 
                        label: "name", 
                        type: "text", 
                        poleType: 'input',
                        validation:{
                            required:{value:true, message:"required"}
                        }
                    },
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
                    { 
                        name: "phone", 
                        label: "phone", 
                        type: "tel",
                        poleType: 'input',
                        validation:{
                            required:{value:true, message:"required"},
                            minLength: {value:9, message:"minLength 9"},
                            maxLength: {value:12, message:"maxLength 12"}
                        } 
                    },
                    { 
                        name: "role", 
                        label: "role", 
                        poleType: 'select',
                        type: "select",
                        select: ['Клієнт', 'Фрілансер'],
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
    conectRedux,
);

export default hocs(Register)

