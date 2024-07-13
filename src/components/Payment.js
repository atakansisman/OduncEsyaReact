import React, { useState } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import './Payment.css';

const Payment = () => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    setPaymentSuccess(true);
  };

  const handleCardNumberChange = (e) => {
    const { value } = e.target;
    if (!/^\d*$/.test(value)) {
      e.preventDefault();
    } else if (value.length <= 16) {
      e.target.value = value;
    }
  };

  const handleExpiryDateChange = (e) => {
    const { value } = e.target;
    if (/^\d{0,2}\/?\d{0,2}$/.test(value)) {
      e.target.value = value;
    }
  };

  const validateExpiryDate = (rule, value) => {
    if (!value || !/^\d{2}\/\d{2}$/.test(value)) {
      return Promise.reject('Lütfen geçerli bir son kullanma tarihi girin!');
    }
    const [month, year] = value.split('/');
    if (parseInt(month, 10) < 1 || parseInt(month, 10) > 12) {
      return Promise.reject('Lütfen geçerli bir ay girin!');
    }
    if (parseInt(year, 10) < 25) {
      return Promise.reject('Yıl 25\'ten küçük olamaz!');
    }
    return Promise.resolve();
  };

  const handleCVVChange = (e) => {
    const { value } = e.target;
    if (!/^\d*$/.test(value)) {
      e.preventDefault();
    } else if (value.length <= 3) {
      e.target.value = value;
    }
  };

  return (
    <div className="payment-container">
      <h2>Ödeme Sayfası</h2>
      {paymentSuccess ? (
        <Alert
          message="Ödeme gerçekleşmiştir ve faturanız mailinize gönderilmiştir."
          type="success"
          showIcon
        />
      ) : (
        <Form
          name="payment"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            name="cardName"
            label="Kart Sahibi"
            rules={[
              {
                required: true,
                message: 'Lütfen kart sahibi adını girin!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="cardNumber"
            label="Kart Numarası"
            rules={[
              {
                required: true,
                message: 'Lütfen kart numarasını girin!',
              },
              {
                pattern: /^[0-9]{16}$/,
                message: 'Lütfen 16 haneli kart numarası girin!',
              },
            ]}
          >
            <Input maxLength={16} onInput={handleCardNumberChange} />
          </Form.Item>

          <Form.Item
            name="expiryDate"
            label="Son Kullanma Tarihi"
            rules={[
              {
                required: true,
                message: 'Lütfen son kullanma tarihini girin!',
              },
              {
                validator: validateExpiryDate,
              },
            ]}
          >
            <Input maxLength={5} onInput={handleExpiryDateChange} placeholder="MM/YY" />
          </Form.Item>

          <Form.Item
            name="cvv"
            label="CVV"
            rules={[
              {
                required: true,
                message: 'Lütfen CVV girin!',
              },
              {
                pattern: /^[0-9]{3}$/,
                message: 'Lütfen 3 haneli CVV girin!',
              },
            ]}
          >
            <Input maxLength={3} onInput={handleCVVChange} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Ödemeyi Tamamla
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default Payment;
