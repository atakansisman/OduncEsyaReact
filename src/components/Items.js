import React, { useState } from 'react';
import { List, Button, Input, Form, DatePicker, TimePicker, Modal } from 'antd';
import moment from 'moment';
import './Items.css';

const { RangePicker } = DatePicker;

const Items = () => {
  const [items, setItems] = useState([]);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const addItem = (values) => {
    const newItem = {
      name: values.item,
      dateRange: values.dateRange.map(date => date.format('DD-MM-YYYY')),
      duration: values.duration.format('HH:mm'),
    };
    setItems([...items, newItem]);
    form.resetFields();
  };

  const removeItem = (item) => {
    setItems(items.filter(i => i !== item));
  };

  const showModal = (item) => {
    setSelectedItem(item);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedItem(null);
  };

  const disabledDate = (current) => {
    return current && current < moment().endOf('day');
  };

  return (
    <div className="items-container">
      <h2>Eşyalarım</h2>
      <Form form={form} onFinish={addItem} layout="inline">
        <Form.Item
          name="item"
          rules={[{ required: true, message: 'Lütfen eşya adını girin!' }]}
        >
          <Input placeholder="Eşya Adı" />
        </Form.Item>
        <Form.Item
          name="dateRange"
          rules={[{ required: true, message: 'Lütfen tarih aralığını seçin!' }]}
        >
          <RangePicker
            format="DD-MM-YYYY"
            placeholder={['Başlangıç Tarihi', 'Bitiş Tarihi']}
            disabledDate={disabledDate}
          />
        </Form.Item>
        <Form.Item
          name="duration"
          rules={[{ required: true, message: 'Lütfen süresini girin!' }]}
        >
          <TimePicker placeholder="Süre (saat)" format="HH:mm" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Ekle</Button>
        </Form.Item>
      </Form>
      <List
        bordered
        dataSource={items}
        renderItem={item => (
          <List.Item actions={[
            <Button onClick={() => showModal(item)}>Bilgiler</Button>,
            <Button onClick={() => removeItem(item)}>Sil</Button>
          ]}>
            {item.name} - {item.dateRange[0]} - {item.dateRange[1]} ({item.duration} saat)
          </List.Item>
        )}
      />
      <Modal title="Eşya Bilgileri" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        {selectedItem && (
          <div>
            <p>Adı: {selectedItem.name}</p>
            <p>Tarih Aralığı: {selectedItem.dateRange[0]} - {selectedItem.dateRange[1]}</p>
            <p>Süre: {selectedItem.duration} saat</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Items;
