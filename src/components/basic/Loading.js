import React from 'react';
import { Row, Col, Spin } from 'antd';
import { Loading3QuartersOutlined } from '@ant-design/icons';

export default function Loading({ visible, tip }) {

  const antIcon = <Loading3QuartersOutlined style={{ fontSize: 30 }} spin />;

  return (
    <>
      <Row
        type="flex"
        justify="space-around"
        align="middle"
        style={{ minHeight: 170, display: visible ? '' : 'none' }}
      >
        <Col span={5} style={{ textAlign: 'center' }}>
          <Spin
            size="large"
            tip={tip || 'loading data'}
            indicator={antIcon}
          />
        </Col>
      </Row>
    </>
  )
}
