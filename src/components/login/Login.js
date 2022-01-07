import React from 'react';
import {
  Row, Col, Typography, Card, Form, Input,
  Button, message
} from "antd";
import { useDispatch } from "react-redux";

import { login, logout } from '../../redux/actions'

import sideImage from "../../assets/images/store.png";
import getAgentInstance from "../../helpers/superagent";

const superagent = getAgentInstance();

export default function Login() {
  const dispatch = useDispatch();

  const onFinish = (val) => {
    superagent
      .post(`${process.env.REACT_APP_API_LINK}auth/login`)
      .send({ username: val.username, password: val.password })
      .end((err, res) => {
        const { body } = res;
        if (body.success) {
          const { data } = body;
          const userData = {
            token: data.token,
            user: data.user
          }
          dispatch(login())
          localStorage.setItem("store-user", JSON.stringify(userData))
        } else {
          dispatch(logout())
          message.error({ content: "Login Failed!" });
        }
      });
  }
  return (
    <>
      <Row justify="center" align="middle">
        <Col span={15}>
          <div className="logo_container">
            <img src={sideImage} alt="Logo" />
          </div>
        </Col>
        <Col span={9}>
          <Row className="login_input_container">
            <Col span={24}>
              <Typography.Title
                align="center"
                color="primary"
              >
                Clothing Store
              </Typography.Title>
            </Col>
            <Col span={24}>
              <Card bordered={false}>
                <Form
                  layout="vertical"
                  onFinish={onFinish}
                >
                  <Row gutter={[0, 10]}>
                    <Col span={24}>
                      <Form.Item
                        label="User Name"
                        name="username"
                        rules={[
                          { required: true, message: "This input is required!" },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                          { required: true, message: "This input is required!" },
                        ]}
                      >
                        <Input.Password />
                      </Form.Item>
                    </Col>
                    <Col span={4} offset={20}>
                      <Button
                        block
                        type="primary"
                        htmlType="submit"
                      >
                        Login
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}
