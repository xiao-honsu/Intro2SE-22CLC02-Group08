import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCartItem from "../components/ProductCartItem";
import { Button, Badge } from "react-bootstrap";

import cartAPI from "../services/cart";

import "../styles/CartPage.scss";

const CartPage = () => {
    const buyerID = localStorage.getItem("id");
    const [cart, setCart] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleRemoveFromCart = async (productID) => {
        try {
            const response = await cartAPI.removeFromCart(buyerID, productID);
            if (response.success) {
                // Cập nhật danh sách sản phẩm và tổng số tiền
                setProducts((prev) => prev.filter((item) => item._id !== productID));
                setCart((prev) => ({
                    ...prev,
                    totalAmount: prev.totalAmount - response.removedProductPrice,
                }));
            } else {
                alert(response.message || "Failed to remove product from cart.");
            }
        } catch (error) {
            console.error("Error removing product from cart:", error);
            alert("An unexpected error occurred while removing product.");
        }
    };
    
    useEffect(() => {
        const fetchCart = async () => {
            if (!buyerID) {
                console.error("User id is not available.");
                return;
            }
            try {
                const response = await cartAPI.getCart(buyerID); 
                if (response.success) {
                    setCart(response.cart);
                    setProducts(response.products);
                } else {
                    console.error(response.message);
                }
            } catch (error) {
                console.error("Error fetching cart:", error);
            } finally {
                setLoading(false);
            }
        };
      
        fetchCart();
    });

    if (loading) return <div>Loading...</div>;

    if (!products.length) {
        return <div className="main-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <div className="cart-container" style={{ flex: 1, textAlign: 'center', padding: '20px' }}>
            
            <p style={{margin: '5rem'}}>Your cart is empty.</p>
        </div>
        <Footer showBanner={true} />
    </div>
    
    } 
    return (
        <div className="main-container">
            <Header />

            <div className="cart-container" style={{marginTop: '5rem'}}>
                {products.map((item, index) => (
                    <div className="cart-items position-relative">
                        <Badge bg="danger" className="position-absolute" style={{ top: "10px", right: "10px", cursor: "pointer" }}
                            onClick={() => handleRemoveFromCart(item._id)} >
                            Remove
                        </Badge>
                        <ProductCartItem key={index} product={item} />
                    </div>
                ))}
                <div className="cart-summary" style={{ flex: 1, textAlign: 'center', padding: '20px', marginTop: '3rem' }}>
                    <h3>Total Amount: {cart?.totalAmount || 0} Dong</h3>
                </div>
            </div>

                    
            <Footer showBanner={true} />
        </div>
    );
};

export default CartPage;
