import { NavLink, useNavigate } from "react-router-dom";

export default function LogTheClient() : React.ReactElement {

    const navigate = useNavigate()

    return (
    <div className="p-5 mb-4 bg-body-tertiary rounded-3">
      <div className="container-fluid py-5">
        <h1 className="display-5 fw-bold">Увійти як замовник</h1>
        <p className="col-md-8 fs-4">Замовляйте роботи. Натисніть кнопку нижче для входу в кабінет замовника</p>
        <button className="btn btn-primary btn-lg" onClick={()=>{navigate('/kabinet-client')}} type="button">Вхід</button>
      </div>
    </div>
    );
}