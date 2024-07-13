import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import './Login.css';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Başarılı:', values);
    onLogin();
    navigate('/home');
  };

  return (
    <div className="login-container">
      <h2>Giriş Yap</h2>
      <Form name="login" onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Lütfen kullanıcı adınızı girin!' }]}
        >
          <Input placeholder="Kullanıcı Adı" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Lütfen şifrenizi girin!' }]}
        >
          <Input.Password placeholder="Şifre" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Giriş Yap
          </Button>
        </Form.Item>
      </Form>
      <p onClick={() => navigate('/register')} className="switch-form">
        Hesabınız yok mu? Kayıt olun.
      </p>
    </div>
  );
};

export default Login;
