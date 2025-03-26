import { connect, ConnectedProps } from "react-redux";
import Header from "./Header";
import { compose } from "redux";
import { HTMLAttributes } from "react";

export type HeaderPropsType = HTMLAttributes<HTMLElement> & {
};

export type HeaderContainerPropsType = HTMLAttributes<HTMLElement> & {
    
};
// mapStateToProps is not necessary if you don't need any state
const mapStateToProps = () => ({});

const connector = compose(
    connect(mapStateToProps, null),
);

export type ReduxPropsType = ConnectedProps<typeof connector>;

const HeaderContainer = ({...props}: HeaderContainerPropsType & ReduxPropsType)=>{

    return <Header
    />
}

export default connector(HeaderContainer);
