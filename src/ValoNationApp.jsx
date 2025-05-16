import { useState, useReducer } from "react";
import Footer from "./components/Footer";
import Heading from "./components/Heading";
import ShopContainer from "./components/shop/ShopContainer";
import { cartReducer, initialState } from "./reducers/cart-reducer";

export default function ValoNationApp() {
  const [cart, cartDispatch] = useReducer(cartReducer, initialState)
  
  // const [cart, setCart] = useState([]);

  const addToCart = weapon => {
    //Revisar si producto ya existe
    const itemIndex = cart.findIndex(product => product.id === weapon.id); 
    if(itemIndex >= 0){
      const updatedCart = [...cart];

      updatedCart[itemIndex].quantity++
      setCart(updatedCart);
    }else{
      weapon.quantity = 1;

      setCart(prevCart => [...prevCart, weapon]);
    }
  }

  const deleteFromCart = weaponId => {
    setCart(cart.filter(weapon => weapon.id !== weaponId));
  }

  const clearCart = () => setCart([]);

  return (
    <>
      <Heading title="tienda" cart={cart} deleteFromCart={deleteFromCart} clearCart={clearCart} />

      <ShopContainer cartDispatch={cartDispatch}/>

      <Footer />
    </>
  );
}
