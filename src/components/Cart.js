import React from 'react';
import { List, Card, Button } from 'antd';
import './Cart.css';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cartItems, removeFromCart }) => {
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((total, item) => {
    const pricePerDay = parseFloat(item.price.split(' ')[0]);
    const totalDays = 7; // Örnek olarak her ürün için 7 gün hesapladık
    return total + pricePerDay * totalDays;
  }, 0);

  const handlePayment = () => {
    navigate('/home/payment');
  };

  return (
    <div className="cart-container">
      <h2>Sepetim</h2>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={cartItems}
        renderItem={item => (
          <List.Item>
            <Card actions={[<Button onClick={() => removeFromCart(item)}>Sil</Button>]}>
              <Card.Meta
                title={item.name}
                description={
                  <>
                    <p>Tarih Aralığı: {item.dateRange[0]} - {item.dateRange[1]}</p>
                    <p>Fiyat: {item.price}</p>
                  </>
                }
              />
            </Card>
          </List.Item>
        )}
      />
      <div className="total-price">
        Toplam Ücret: {totalPrice} TL
      </div>
      <div className="payment-button-container">
        <Button type="primary" onClick={handlePayment}>Ödeme Onayla</Button>
      </div>
    </div>
  );
};

export default Cart;
