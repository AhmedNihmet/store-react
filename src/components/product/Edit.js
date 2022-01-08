/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import {
  Form, Input, Row, Col, Button, message, Image, InputNumber
} from 'antd'; import {
  SaveOutlined
} from '@ant-design/icons';

import Loading from '../basic/Loading'
import RemoteSelect from "../basic/RemoteSelect";
import BinaryUploader from "../basic/BinaryUploader";
import getAgentInstance from '../../helpers/superagent';

const superagent = getAgentInstance();

export default function Edit({ reloadGrid, closeNewModal, resourceId }) {
  const categoryRef = useRef()
  const [form] = Form.useForm();
  const [pic, setPic] = useState('false');
  const [loading, setLoading] = useState(false);
  const [disableCaty, setDisableCaty] = useState(true);

  const fetchProducts = (id) => {
    superagent
      .get(`/product/${id}`)
      .end((err, res) => {
        if (!err) {
          const { body } = res;
          form.setFieldsValue({
            ...body,
            name: body.name,
            store_id: { key: body.store_id, label: body.store_name },
            category_id: { key: body.category_id, label: body.category_name }
          });
          setPic(`${process.env.REACT_APP_API_LINK}/uploads/${body.coverpic}`)
        }
        setLoading(false)
      });
  }

  const onFinish = (val) => {
    console.log(val)
    setLoading(true);

    const data = {
      ...val,
      store_id: val.store_id ? val.store_id.key : undefined,
      category_id: val.category_id ? val.category_id.key : undefined,
      coverpic: val.coverpic ? val.coverpic[0].base64 : undefined,
    }

    superagent
      .put(`/product/${resourceId}`)
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

  useEffect(() => {
    fetchProducts(resourceId)
  }, [])

  return (
    <>
      <Loading visible={loading} />
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onValuesChange={onValuesChange}
        style={{ display: loading ? 'none' : '' }}
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
          <Col span={12} style={{ textAlign: 'center', height: 200 }}>
            <Image src={pic} className="product_image" />
          </Col>
          <Col span={12}>
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
