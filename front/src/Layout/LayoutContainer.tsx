import { connect, ConnectedProps } from "react-redux";
import Layout from "./Layout";
import { compose } from "redux";
import { RootState } from "../redux/rootReducer";

const LayoutContainer = (props: ReduxPropsType) => {
    
    return (
        <Layout/>
    )
}

// mapStateToProps: указывает, какие данные из состояния передать
const mapStateToProps = (state: RootState) => ({
    
});

// Объединяем mapStateToProps и mapDispatchToProps
const connector = compose(
    connect(mapStateToProps, null),
);

// Типизируем пропсы
export type ReduxPropsType = ConnectedProps<typeof connector>;

// Экспортируем подключенный компонент
export default connector(LayoutContainer);