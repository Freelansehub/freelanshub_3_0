import { connect, ConnectedProps } from "react-redux";
import Header from "./Header";
import { compose } from "redux";
import { HTMLAttributes } from "react";

export type HeaderContainerPropsType = HTMLAttributes<HTMLElement> & {
    
};
// mapStateToProps is not necessary if you don't need any state
const mapStateToProps = () => ({});

const connector = compose(
    connect(mapStateToProps, null),
);

export type ReduxPropsType = ConnectedProps<typeof connector>;

const HeaderContainer = ({...props}: HeaderContainerPropsType & ReduxPropsType)=>{

    const headerMenu = [
        {
            name: 'client',
            headerDropMenu: [
                {
                    url: '/client',
                    title: 'Замовникам',
                    description: 'Оформити замовлення',
                    icon: '/images/icons/client.svg'
                },
                {
                    url: '/frilans',
                    title: 'Фрілансерам',
                    description: 'Оформити замовлення',
                    icon: '/images/icons/frilans.svg'
                },
                {
                    url: '/vacancy',
                    title: 'Вакансії',
                    description: 'Оформити замовлення',
                    icon: '/images/icons/vacancy.svg'
                }
            ]
        }
    ]

    return <Header
    headerMenu={headerMenu}
    />
}

export default connector(HeaderContainer);
