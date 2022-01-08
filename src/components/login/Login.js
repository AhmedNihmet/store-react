import React, { useState } from 'react';
import {
  Row, Col, Typography, Card, Form, Input,
  Button, message
} from "antd";

import sideImage from "../../assets/images/store.png";
import getAgentInstance from "../../helpers/superagent";

const superagent = getAgentInstance();

export default function Login() {
  const [loading, setLoading] = useState(false)

  const onFinish = (val) => {
    setLoading(true)
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
          localStorage.setItem("store-user", JSON.stringify(userData))
          window.location.reload()
        } else {
          message.error({ content: "Login Failed!" });
        }
        setLoading(false)
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
                        loading={loading}
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
