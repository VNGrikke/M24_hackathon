
interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartProps {
  cart: CartItem[];
  updateCartItem: (productId: number, quantity: number) => void;
  deleteCartItem: (productId: number) => void;
}

export default function Cart({ cart, updateCartItem, deleteCartItem }: CartProps) {
  return (
    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
      <div className="panel panel-danger">
        <div className="panel-heading">
          <h1 className="panel-title">Your Cart</h1>
        </div>
        <div className="panel-body">
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: "4%" }}>STT</th>
                <th>Name</th>
                <th style={{ width: "15%" }}>Price</th>
                <th style={{ width: "4%" }}>Quantity</th>
                <th style={{ width: "25%" }}>Action</th>
              </tr>
            </thead>
            <tbody id="my-cart-body">
              {cart.length === 0 ? (
                <tr>
                  <td colSpan={5}>No items in the cart</td>
                </tr>
              ) : (
                cart.map((item, index) => (
                  <tr key={item.product.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.product.name}</td>
                    <td>{item.product.price} USD</td>
                    <td>
                      <input
                        name={`cart-item-quantity-${item.product.id}`}
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartItem(item.product.id, parseInt(e.target.value))
                        }
                      />
                    </td>
                    <td>
                      <button
                        className="label label-info update-cart-item"
                        onClick={() => updateCartItem(item.product.id, item.quantity)}
                      >
                        Update
                      </button>
                      <button
                        className="label label-danger delete-cart-item"
                        onClick={() => deleteCartItem(item.product.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot id="my-cart-footer">
              <tr>
                <td colSpan={4}>
                  There are <b>{cart.length}</b> items in your shopping cart.
                </td>
                <td colSpan={2} className="total-price text-left">
                  {cart.reduce((total, item) => total + item.product.price * item.quantity, 0)} USD
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
