
import { NavLink, useNavigate } from "react-router-dom";
import { HeaderPropsType } from "./HeaderContainer";

export default function Header({ ...props }: HeaderPropsType): React.ReactElement {

    const navigate = useNavigate()

    return (
        <header data-testid="header-layout" className="p-3 text-bg-dark">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <NavLink data-testid="logo-link" to="#" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                        <span>
                            <img src={
                                "as"
                            } alt="logo" width={40} height={40} className="me-2" />
                            <span className="fs-4">FreelansHub</span>
                        </span>
                    </NavLink>

                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li><NavLink to="/" data-testid="home-link" className="nav-link px-2 text-white">Головна</NavLink></li>
                        <li><NavLink to="/" data-testid="home-link" className="nav-link px-2 text-white">Цінова політика</NavLink></li>
                        <li><NavLink to="/privacy-policy" data-testid="login-link" className="nav-link px-2 text-white">Політика конфеденційності</NavLink></li>
                        <li><NavLink to="/saport" data-testid="saport-link" className="nav-link px-2 text-white">Служба підтримки</NavLink></li>
                    </ul>

                    <div className="text-end">
                        <button type="button" onClick={()=>{navigate('/login')}} className="btn btn-outline-light me-2">Увійти</button>
                        <button type="button" className="btn btn-warning">Зареєструватися</button>
                    </div>
                </div>
            </div>
        </header>
    );
}
