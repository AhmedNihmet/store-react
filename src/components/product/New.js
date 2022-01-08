import React, { useState } from 'react';
import {
  Form, Input, Row, Col, Button, message
} from 'antd'; import {
  SaveOutlined
} from '@ant-design/icons';

import RemoteSelect from "../basic/RemoteSelect";
import BinaryUploader from "../basic/BinaryUploader";
import getAgentInstance from '../../helpers/superagent';

const superagent = getAgentInstance();

export default function New({ reloadGrid, closeNewModal }) {
  const [loading, setLoading] = useState(false);


  const onFinish = (val) => {
    setLoading(true);

    const data = {
      name: val.name,
      store_id: val.store_id.key,
      coverpic: val.coverpic[0].base64,
    }
    superagent
      .post('/category')
      .send(data)
      .end((err) => {
        if (!err) {
          reloadGrid();
          closeNewModal()
          message.success({ content: "Success..." });
        } else {
          message.error({ content: "Something went wrong!" });
        }
        setLoading(false);
      });
  }

  return (
    <>
      <Form
        layout="vertical"
        onFinish={onFinish}
      >
        <Row gutter={[10, 10]}>
          <Col span={12}>
            <Form.Item
              label="name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'This input is required!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Store"
              name="store_id"
              rules={[
                {
                  required: true,
                  message: 'This input is required!',
                },
              ]}
            >
              <RemoteSelect
                endpoint="/store/list"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="coverpic"
              rules={[
                {
                  required: true,
                  message: 'This input is required!',
                },
              ]}
            >
              <BinaryUploader
                accept="image/jpeg,image/gif"
                maxFileCount={1}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="end">
          <Col>
            <Button
              type="primary"
              size="middle"
              htmlType="submit"
              loading={loading}
              icon={<SaveOutlined />}
            >
              Save
            </Button>
          </Col>
        </Row>


      </Form>
    </>
  )
}
