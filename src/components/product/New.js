import React, { useState, useRef } from 'react';
import {
  Form, Input, Row, Col, Button, message, InputNumber
} from 'antd'; import {
  SaveOutlined
} from '@ant-design/icons';

import RemoteSelect from "../basic/RemoteSelect";
import BinaryUploader from "../basic/BinaryUploader";
import getAgentInstance from '../../helpers/superagent';

const superagent = getAgentInstance();

export default function New({ reloadGrid, closeNewModal }) {
  const categoryRef = useRef()
  const [loading, setLoading] = useState(false);
  const [disableCaty, setDisableCaty] = useState(true);

  const onFinish = (val) => {
    setLoading(true);

    const data = {
      ...val,
      name: val.name,
      store_id: val.store_id.key,
      category_id: val.category_id.key,
      coverpic: val.coverpic[0].base64,
    }
    superagent
      .post('/product')
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

  const onValuesChange = (values) => {
    if (values.store_id) {
      setDisableCaty(false)
      categoryRef.current.loadData(
        undefined,
        `/category/list?q=${values.store_id.label}`
      );
    }
  }

  return (
    <>
      <Form
        layout="vertical"
        onFinish={onFinish}
        onValuesChange={onValuesChange}
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
              label="Price"
              name="price"
              rules={[
                {
                  required: true,
                  message: 'This input is required!',
                },
              ]}
            >
              <InputNumber style={{ width: '100%' }} />
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
          <Col span={12}>
            <Form.Item
              label="Category"
              name="category_id"
              rules={[
                {
                  required: true,
                  message: 'This input is required!',
                },
              ]}
            >
              <RemoteSelect
                ref={categoryRef}
                disabled={disableCaty}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: 'This input is required!',
                },
              ]}
            >
              <Input.TextArea rows={5} />
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
