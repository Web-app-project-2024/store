import './Card.css';

function Card({ title, imageUrl, price }) {
    
    return (
        <div className="card">
            <img src={imageUrl} alt={title} className="card-image" />
            <div className="card-content">
            <h3 className="card-title">Ноутбук {title}</h3>
            <p className="card-price">{price} $</p>
            </div>
      </div>
    );
  }
  
  export default Card;