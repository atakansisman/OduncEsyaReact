import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Başarılı:', values);
    // Kullanıcı bilgilerini kaydetmek için backend çağrısı burada yapılmalıdır.
    // Kayıt başarılıysa:
    navigate('/login');
  };

  return (
    <div className="register-container">
      <h2>Kayıt Ol</h2>
      <Form name="register" onFinish={onFinish}>
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
        <Form.Item
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Lütfen şifrenizi doğrulayın!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Girdiğiniz şifreler eşleşmiyor!'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Şifreyi Doğrula" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Kayıt Ol
          </Button>
        </Form.Item>
      </Form>
      <p onClick={() => navigate('/login')} className="switch-form">
        Zaten bir hesabınız var mı? Giriş yapın.
      </p>
    </div>
  );
};

export default Register;
