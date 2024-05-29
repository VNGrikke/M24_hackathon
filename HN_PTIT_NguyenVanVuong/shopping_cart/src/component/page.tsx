import React, { useState, useEffect } from "react";
import ListProduct from "./listProduct";
import Cart from "./cart";
import Notification from "./notification";
// máy em hôm qua bị lỗi từ lúc 3:30 không làm đc bài, tối qua em về bật mãi không lên thầy cho phép em nộp muộn ạ
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

export default function Page() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Pizza",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente ipsam atque aperiam quaerat, temporibus cum ab ea rem praesentium deserunt sunt laborum accusantium explicabo quis soluta quam amet eos tempore.",
      price: 30,
      imageUrl: "./src/images/pizza.jpg",
      quantity: 1,
    },
    {
      id: 2,
      name: "Hamburger",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente ipsam atque aperiam quaerat, temporibus cum ab ea rem praesentium deserunt sunt laborum accusantium explicabo quis soluta quam amet eos tempore.",
      price: 15,
      imageUrl: "./src/images/Hamburger.jpg",
      quantity: 4,
    },
    {
      id: 3,
      name: "Bread",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente ipsam atque aperiam quaerat, temporibus cum ab ea rem praesentium deserunt sunt laborum accusantium explicabo quis soluta quam amet eos tempore.",
      price: 20,
      imageUrl: "./src/images/bread.jpg",
      quantity: 1,
    },
    {
      id: 4,
      name: "Cake",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente ipsam atque aperiam quaerat, temporibus cum ab ea rem praesentium deserunt sunt laborum accusantium explicabo quis soluta quam amet eos tempore.",
      price: 10,
      imageUrl: "./src/images/cake.jpg",
      quantity: 1,
    },
  ]);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [notification, setNotification] = useState<{
    message: string;
    type: string;
  } | null>(null);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("products", JSON.stringify(products));
  }, [cart, products]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const storedProducts = localStorage.getItem("products");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  const addToCart = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const existingCartItem = cart.find((item) => item.product.id === productId);
    if (existingCartItem) {
      setCart(
        cart.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      setProducts((prevProducts) =>
        prevProducts.map((prevProduct) =>
          prevProduct.id === productId
            ? { ...prevProduct, quantity: prevProduct.quantity - 1 }
            : prevProduct
        )
      );
      showNotification("Product quantity updated in cart", "warning");
    } else {
      if (product.quantity > 0) {
        setCart([...cart, { product, quantity: 1 }]);
        setProducts((prevProducts) =>
          prevProducts.map((prevProduct) =>
            prevProduct.id === productId
              ? { ...prevProduct, quantity: prevProduct.quantity - 1 }
              : prevProduct
          )
        );
        showNotification("Added to cart successfully", "success");
      } else {
        showNotification("Out of stock", "danger");
      }
    }
  };

  const deleteCartItem = (productId: number) => {
    setCart(cart.filter((item) => item.product.id !== productId));
    const product = products.find((p) => p.id === productId);
    if (!product) return;
    setProducts((prevProducts) =>
      prevProducts.map((prevProduct) =>
        prevProduct.id === productId
          ? { ...prevProduct, quantity: prevProduct.quantity + 1 }
          : prevProduct
      )
    );
    showNotification("Deleted cart item successfully", "danger");
  };

  const updateCartItem = (productId: number, quantity: number) => {
    const productIndex = products.findIndex((p) => p.id === productId);
    if (productIndex === -1) return;

    const updatedProducts = [...products];
    updatedProducts[productIndex] = {
      ...updatedProducts[productIndex],
      quantity,
    };
    setCart(
      cart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    showNotification("Updated cart item successfully", "warning");
  };

  const showNotification = (message: string, type: string) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 500);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Shopping Cart</h1>
      </div>
      <div className="row">
        <ListProduct products={products} addToCart={addToCart} />
        <Cart
          cart={cart}
          updateCartItem={updateCartItem}
          deleteCartItem={deleteCartItem}
        />
      </div>
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
    </div>
  );
}
