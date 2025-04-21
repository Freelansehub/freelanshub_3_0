import { connect, ConnectedProps } from "react-redux";
import Login from "./Login";
import { FormEvent, HTMLAttributes, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { compose } from "redux";
import { RootState } from "../../../redux/rootReducer";
import authActions from "../../../features/auth/authActions";
import { RoleType } from "../../../features/user/userReducer";
import { authSelectors } from "../../../features/auth/authSelector";

export type LoginProps = HTMLAttributes<HTMLElement> & {
  
};

export type LoginContainerProps = HTMLAttributes<HTMLElement> & {
}

const mapStateToProps = (state: RootState) => ({
});

const mapDispatchToProps = {
};

const reduxConect = connect(mapStateToProps, mapDispatchToProps);

function LoginContainer({
}: ReduxPropsType): React.ReactElement {
  const navigate = useNavigate();

  return (
    <Login
    />
  );
}

const connector = compose(
  reduxConect
);

export type ReduxPropsType = ConnectedProps<typeof connector>;

export default connector(LoginContainer);
