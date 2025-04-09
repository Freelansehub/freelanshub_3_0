import { useNavigate, Link } from "react-router-dom";

const Order = () => {
  const navigate = useNavigate(); // Оголошення useNavigate
    return (
    <div className="col">
        <div className="card shadow-sm">
          <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em"></text></svg>
          <div className="card-body">
            <p className="card-text">Інформація про замовлення</p>
            <div className="d-flex justify-content-between align-items-center">
              <div className="btn-group">
                <button onClick={() => navigate("/aboutproject")} type="button" className="btn btn-sm btn-outline-secondary">Переглянути</button>
              </div>
              <small className="text-body-secondary">9 mins</small>
            </div>
          </div>
        </div>
      </div>

    );
};

export default Order;