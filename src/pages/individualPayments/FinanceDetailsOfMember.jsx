import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Table,
  Button,
  Form,
  InputNumber,
  DatePicker,
  Row,
  Col,
  Modal,
  message,
  Select,
} from 'antd';
import moment from 'moment';

const { Option } = Select;

const IndividualPayments = () => {
  const { memberId } = useParams(); // Get memberId from URL params
  const [financeData, setFinanceData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const [form] = Form.useForm();

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://127.0.0.1:4343/api/v1/members`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMembers(response.data);
      } catch (error) {
        message.error('Failed to fetch members, please reload the page');
      }
      setLoading(false);
    };

    fetchMembers();
  }, [token, memberId]);

  const handleSubmit = async (values) => {
    const { date, amount, memberId, type } = values;

    const formattedDate = date.toISOString(); // Ensure date is correctly formatted

    const newRecord = {
      memberId: memberId, // Ensure memberId is correctly passed
      type: type,
      amount: amount,
      date: formattedDate,
    };

    if (memberId) {
      try {
        const response = await axios.post(
          `http://127.0.0.1:4343/api/v1/payments`,
          newRecord,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        setFinanceData((prevData) => [...prevData, response.data]); // Assuming response.data contains the newly created payment record
        message.success('Payment record added successfully');
        setIsModalVisible(false);
        form.resetFields();
      } catch (err) {
        message.error('Failed to add payment record');
        console.error(err);
      }
    } else {
      message.error('Member ID is missing');
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  // Create an array with month names for the table headers
  const months = moment.months();

  // Process finance data into a structure suitable for the table
  const data = financeData.reduce(
    (acc, cur) => {
      const month = moment(cur.date, 'YYYY-MM').format('MMMM');
      acc[cur.type][month] = cur.amount || 0;
      return acc;
    },
    { pastoralFunds: {}, membershipCard: {} }
  );

  return (
    <div style={{ margin: '0 auto' }}>
      <h1>Finance Page</h1>
      <h2>Member Payments</h2>
      <Button type='primary' onClick={showModal}>
        Add Payments
      </Button>
      <Modal
        title='Add Payment'
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}>
        <Form form={form} onFinish={handleSubmit} layout='vertical'>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name='memberId'
                label='Select Member'
                rules={[
                  { required: true, message: 'Please select a member!' },
                ]}>
                <Select placeholder='Select Member'>
                  {members.map((member) => (
                    <Option key={member.id} value={member.id}>
                      {member.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name='type'
                label='Payment Type'
                rules={[
                  { required: true, message: 'Please select a payment type!' },
                ]}>
                <Select placeholder='Select Payment Type'>
                  <Option value='pastoralFunds'>Pastoral Funds</Option>
                  <Option value='membershipCard'>Membership Card</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name='date'
                label='Select Month and Year'
                rules={[
                  {
                    required: true,
                    message: 'Please select the month and year!',
                  },
                ]}>
                <DatePicker picker='month' style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name='amount'
                label='Amount'
                rules={[
                  { required: true, message: 'Please enter the amount!' },
                ]}>
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Button type='primary' htmlType='submit'>
            Add Payment
          </Button>
        </Form>
      </Modal>
      <table className='post-table'>
        <thead>
          <tr>
            <th>Type</th>
            {months.map((month) => (
              <th key={month}>{month}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Pastoral Funds</td>
            {months.map((month) => (
              <td key={month}>
                {data.pastoralFunds[month]
                  ? `N$${data.pastoralFunds[month]},00`
                  : 'N$0,00'}
              </td>
            ))}
          </tr>
          <tr>
            <td>Membership Card</td>
            {months.map((month) => (
              <td key={month}>
                {data.membershipCard[month]
                  ? `N$${data.membershipCard[month]},00`
                  : 'N$0,00'}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default IndividualPayments;
