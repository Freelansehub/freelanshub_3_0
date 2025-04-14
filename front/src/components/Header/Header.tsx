import { NavLink, useNavigate } from "react-router-dom";
import { HTMLAttributes, useState, useRef, useEffect } from "react";
import { HeaderDropMenu } from "./HeaderModuls/HeaderDropMenu";
import { headerDropMenuItemType } from "./HeaderModuls/HeaderDropMenuItem";

export type HeaderPropsType = HTMLAttributes<HTMLElement> & {
    headerMenu: { name: string, headerDropMenu: headerDropMenuItemType[] }[];
};

export default function Header({ headerMenu, ...props }: HeaderPropsType): React.ReactElement {
    const [headerDropMenuName, setHeaderDropMenuName] = useState<{
        isActiv: boolean,
        name: string | null
    }>
        ({ isActiv: false, name: null });
    const navigate = useNavigate();

    const menuRef = useRef<HTMLUListElement | null>(null); 

    const handleMenuClick = (menuName: string) => {
        setHeaderDropMenuName({ isActiv: true, name: menuName });
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setHeaderDropMenuName({ isActiv: false, name: null });
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <header>
            <div data-testid="header-layout" className="p-3 text-bg-dark">
                <div className="container" >
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <NavLink
                            data-testid="logo-link"
                            to="/"
                            className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
                        >
                            <span>
                                <img
                                    src={"as"}
                                    alt="logo"
                                    width={40}
                                    height={40}
                                    className="me-2"
                                />
                                <span className="fs-4">FreelansHub</span>
                            </span>
                        </NavLink>

                        <ul
                            ref={menuRef} 
                            className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"
                        >
                            <li>
                                <NavLink
                                    to="#client"
                                    data-testid="home-link"
                                    className="nav-link px-2 text-white"
                                    onClick={() => handleMenuClick('client')}
                                >
                                    Замовникам
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="#freelancer"
                                    data-testid="login-link"
                                    className="nav-link px-2 text-white"
                                    onClick={() => handleMenuClick('freelancer')}
                                >
                                    Фрілансерам
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="#jobs"
                                    data-testid="saport-link"
                                    className="nav-link px-2 text-white"
                                    onClick={() => handleMenuClick('vacancy')}
                                >
                                    Вакансії
                                </NavLink>
                            </li>
                        </ul>

                        <div className="text-end">
                            <button
                                type="button"
                                onClick={() => { navigate('/auth/login') }}
                                className="btn btn-outline-light me-2"
                            >
                                Вхід
                            </button>
                            <button
                                type="button"
                                className="btn btn-warning"
                                onClick={() => { navigate('/auth/register') }}
                            >
                                Реєстрація
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {headerDropMenuName.isActiv && (
                <HeaderDropMenu
                    menuList={headerMenu.find((item) => item.name === headerDropMenuName.name)?.headerDropMenu || []}
                />
            )}
        </header>
    );
}
