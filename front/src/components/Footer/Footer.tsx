import { useNavigate, Link } from "react-router-dom";

const Footer = () => {
    return(
  <footer className="py-3 my-4">
      <ul className="nav justify-content-center border-bottom pb-3 mb-3">
        <li className="nav-item"><Link to="/" className="nav-link px-2 text-body-secondary">Головна</Link></li>
        <li className="nav-item"><Link to="/privacy-policy" className="nav-link px-2 text-body-secondary">Політика конфеденційності</Link></li>
        <li className="nav-item"><Link to="/contract" className="nav-link px-2 text-body-secondary">Договір</Link></li>
        <li className="nav-item"><Link to="/about" className="nav-link px-2 text-body-secondary">Про нас</Link></li>
        <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">cathouse7565@gmail.com</a></li>
      </ul>
      <p className="text-center text-body-secondary">© 2025 CatHaus</p>
    </footer>
    );
  }

  export default Footer;