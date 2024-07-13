import React from 'react';
import { List, Card, Image, Button } from 'antd';
import './Shopping.css';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const items = [
  {
    name: 'Kamp Sandalyesi',
    image: require('../assets/kampsandalyesi.jpg'),
    dateRange: [moment().add(1, 'days').format('DD-MM-YYYY'), moment().add(7, 'days').format('DD-MM-YYYY')],
    price: '20 TL/gün',
  },
  {
    name: 'Bisiklet',
    image: require('../assets/bisiklet.jpg'),
    dateRange: [moment().add(2, 'days').format('DD-MM-YYYY'), moment().add(8, 'days').format('DD-MM-YYYY')],
    price: '50 TL/gün',
  },
  {
    name: 'Oyun Konsolu',
    image: require('../assets/oyunkonsolu.jpg'),
    dateRange: [moment().add(3, 'days').format('DD-MM-YYYY'), moment().add(10, 'days').format('DD-MM-YYYY')],
    price: '70 TL/gün',
  },
  {
    name: 'Matkap',
    image: require('../assets/matkap.jpg'),
    dateRange: [moment().add(4, 'days').format('DD-MM-YYYY'), moment().add(12, 'days').format('DD-MM-YYYY')],
    price: '30 TL/gün',
  },
  {
    name: 'Smokin',
    image: require('../assets/smokin.jpg'),
    dateRange: [moment().add(5, 'days').format('DD-MM-YYYY'), moment().add(15, 'days').format('DD-MM-YYYY')],
    price: '100 TL/gün',
  },
];

const Shopping = ({ addToCart }) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate('/home/cart');
  };

  return (
    <div className="shopping-container">
      <h2>Alışveriş</h2>
      <List
        grid={{ gutter: 16, column: 5 }}
        dataSource={items}
        renderItem={item => (
          <List.Item>
            <Card
              cover={<Image alt={item.name} src={item.image} className="item-image" />}
              actions={[<Button type="primary" onClick={() => addToCart(item)}>Sepete Ekle</Button>]}
            >
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
      <div className="confirm-button-container">
        <Button type="primary" onClick={handleConfirm}>Onayla ve Sepete Git</Button>
      </div>
    </div>
  );
};

export default Shopping;
