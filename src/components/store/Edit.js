/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  Form, Input, Row, Col, Button, message, Image
} from 'antd'; import {
  SaveOutlined
} from '@ant-design/icons';

import Loading from '../basic/Loading'
import BinaryUploader from "../basic/BinaryUploader";
import getAgentInstance from '../../helpers/superagent';

const superagent = getAgentInstance();

export default function Edit({ reloadGrid, closeNewModal, resourceId }) {
  const [form] = Form.useForm();
  const [pic, setPic] = useState('false');
  const [loading, setLoading] = useState(false);

  const fetchStore = (id) => {
    superagent
      .get(`/store/${id}`)
      .end((err, res) => {
        if (!err) {
          const { body } = res;
          form.setFieldsValue({
            name: body.name,
          });
          setPic(`${process.env.REACT_APP_API_LINK}/uploads/${body.coverpic}`)
        }
        setLoading(false)
      });
  }

  const onFinish = (val) => {
    setLoading(true);

    const data = {
      name: val.name,
      coverpic: val.coverpic ? val.coverpic[0].base64 : '',
    }

    superagent
      .put(`/store/${resourceId}`)
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

  useEffect(() => {
    fetchStore(resourceId)
  }, [])

  return (
    <>
      <Loading visible={loading} />
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ display: loading ? 'none' : '' }}
      >
        <Row gutter={[10, 10]}>
          <Col span={24}>
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
          <Col span={24} style={{ textAlign: 'center' }}>
            <Image width="32.2%" src={pic} />
          </Col>
          <Col span={24}>
            <Form.Item
              name="coverpic"
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
