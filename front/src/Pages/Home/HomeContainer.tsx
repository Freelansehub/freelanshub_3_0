import { connect, ConnectedProps } from "react-redux";
import Home from "./Home";
import { compose } from "redux";
import { HTMLAttributes } from "react";

type HomeContainerOwnProps = HTMLAttributes<HTMLElement> & {
    
}
const connector = connect(null, null);

export type HomeContainerProps = ConnectedProps<typeof connector> & HomeContainerOwnProps;

function HomeContainer(){

    return (
        <Home
            
        />
    )
}

const enhance = compose<React.ComponentType>(
    connector
);

export default enhance(HomeContainer);