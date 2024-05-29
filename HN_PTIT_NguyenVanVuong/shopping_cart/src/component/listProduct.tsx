import Product from "./product";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface ListProductProps {
  products: Product[];
  addToCart: (productId: number) => void;
}

export default function ListProduct({ products, addToCart }: ListProductProps) {
  return (
    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h1 className="panel-title">List Products</h1>
        </div>
        <div className="panel-body" id="list-product">
          {products.map((product) => (
            <Product
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              imageUrl={product.imageUrl}
              quantity={product.quantity}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
