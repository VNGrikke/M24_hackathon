import React, { useState } from "react";

interface ProductProps {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
  onAddToCart: (id: number, quantity: number) => void;
}

export default function Product(props: ProductProps) {
  const { id, name, description, price, imageUrl, onAddToCart } = props;

  const [quantity, setQuantity] = useState(props.quantity);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity >= 0 ? newQuantity : 0);
  };

  const handleInputChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const newQuantity = parseInt((event.target as HTMLInputElement).value);
    setQuantity(newQuantity >= 0 ? newQuantity : 0);
  };

  const handleAddToCart = () => {
    onAddToCart(id, quantity);
  };

  return (
    <div className="media product">
      <div className="media-left">
        <a href="#">
          <img className="media-object" src={imageUrl} alt={name} />
        </a>
      </div>
      <div className="media-body">
        <h4 className="media-heading">{name}</h4>
        <p>{description}</p>
        <div className="product-footer">
          <button
            onClick={handleAddToCart}
            className="price"
            disabled={quantity === 0}
          >
            {price} USD
          </button>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            onKeyDown={handleInputChange}
            min={0}
            max={quantity} 
            className="quantity-input"
          />
        </div>
      </div>
    </div>
  );
}
