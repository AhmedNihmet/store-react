/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  Table, Button, Popconfirm, Row, Col, Avatar,
  Switch, Modal
} from 'antd';
import {
  FormOutlined,
  DeleteOutlined,
  PlusOutlined,
  CheckOutlined,
  CloseOutlined
} from '@ant-design/icons';

import New from './New'
import getAgentInstance from '../../helpers/superagent';

const superagent = getAgentInstance();

export default function List() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newModal, setNewModal] = useState(false);

  const deleteItem = (id) => {
    superagent
      .patch(`/store/${id}`)
      .send({ deleted: 1 })
      .end((err) => {
        if (!err) {
          fetch();
        }
      });
  };

  const isActive = (values) => {
    setLoading(true)
    superagent
      .patch(`/store/${values.id}`)
      .send({ active: !values.active })
      .end((err) => {
        if (!err) {
          fetch();
        }
      });
  };

  const fetch = () => {
    setLoading(true)
    superagent.get(`${process.env.REACT_APP_API_LINK}/store/grid`).end((err, res) => {
      if (!err) {
        const { body } = res;
        setLoading(false);
        setData(body.data);
      } else {
        setData(...data)
      }
    });
  };

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: '#',
      width: 70,
    },
    {
      title: 'Cover',
      key: 'coverpic',
      dataIndex: 'coverpic',
      width: 80,
      align: 'center',
      render: (object) => (
        <div>
          <Avatar
            size="large"
            src={`${process.env.REACT_APP_API_LINK}/uploads/${object}`}
          />
        </div>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Active',
      dataIndex: 'active',
      render: (object, all) => (
        <div>
          <Switch
            defaultChecked={object}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            onChange={() => isActive(all)}
          />
        </div>
      ),
    },
    {
      title: 'Actions',
      sorter: false,
      align: 'center',
      width: 120,
      render: (object) => (
        <Button.Group size="large">
          <Button
            // onClick={() => editBtnClicked(object.id)}
            type="dashed"
            icon={<FormOutlined />}
            shape="round"
          />
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => deleteItem(object.id)}
            okButtonProps={{ danger: true }}
            okText="Yes"
            cancelText="No"
            placement="bottom"
          >
            <Button type="dashed" icon={<DeleteOutlined />} shape="round" />
          </Popconfirm>
        </Button.Group>
      ),
    },
  ];

  const showNewModal = () => {
    setNewModal(true)
  }
  const closeNewModal = () => {
    setNewModal(false);
  };

  useEffect(() => {
    fetch()
  }, [])

  return (
    <div>
      <Modal
        centered
        footer={false}
        size="modal-sm"
        key={Math.random}
        title="Add Stores"
        visible={newModal}
        onCancel={closeNewModal}
      >
        <New reloadGrid={fetch} closeNewModal={closeNewModal} />
      </Modal>

      {/* <Modal btnRef={this.editBtn} header="Edit Project" size="modal-lg">
        <EditPerson resourceId={editResourceId} reloadGrid={this.fetch} />
      </Modal> */}

      <Row gutter={[10, 10]}>
        <Col span={24} align="left">
          <Button
            type="primary"
            onClick={showNewModal}
            icon={<PlusOutlined />}
          >
            New
          </Button>
        </Col>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={data}
            loading={loading}
            rowKey={(record) => record.id}
          />
        </Col>
      </Row>
    </div>
  );
}
