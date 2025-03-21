import React, { Component } from "react";
import { Card, Table, Tag, Tooltip, message, Button } from "antd";
import { EyeOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";
import UserView from "./UserView";
import AvatarStatus from "components/shared-components/AvatarStatus";
import { API_BASE_URL } from "configs/AppConfig";

export class ClientList extends Component {
  state = {
    users: [],
    userProfileVisible: false,
    selectedUser: null,
    loading: true,
  };

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`);
      const data = await response.json();
      this.setState({
        users: data.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          username: user.username,
          phone: user.phone,
          website: user.website,
          status: "active",
          lastOnline: moment().unix(),
        })),
        loading: false,
      });
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
      this.setState({ loading: false });
    }
  };

  deleteUser = (userId) => {
    this.setState({
      users: this.state.users.filter((item) => item.id !== userId),
    });
    message.success({ content: `Deleted user ${userId}`, duration: 2 });
  };

  showUserProfile = (userInfo) => {
    this.setState({
      userProfileVisible: true,
      selectedUser: userInfo,
    });
  };

  closeUserProfile = () => {
    this.setState({
      userProfileVisible: false,
      selectedUser: null,
    });
  };

  handleRowClick = (record) => {
    return {
      onClick: () => {
        this.showUserProfile(record);
      },
    };
  };

  render() {
    const { users, userProfileVisible, selectedUser, loading } = this.state;
    const { navigate } = this.props;

    const tableColumns = [
      {
        title: "User",
        dataIndex: "name",
        render: (_, record) => (
          <div className="d-flex">
            <AvatarStatus name={record.name} subTitle={record.email} />
          </div>
        ),
        sorter: {
          compare: (a, b) => {
            a = a.name.toLowerCase();
            b = b.name.toLowerCase();
            return a > b ? -1 : b > a ? 1 : 0;
          },
        },
      },
      {
        title: "Username",
        dataIndex: "username",
        sorter: {
          compare: (a, b) => a.username.length - b.username.length,
        },
      },
      {
        title: "Phone",
        dataIndex: "phone",
      },
      {
        title: "Website",
        dataIndex: "website",
        render: (website) => (
          <a
            href={`http://${website}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {website}
          </a>
        ),
      },
      {
        title: "Status",
        dataIndex: "status",
        render: (status) => (
          <Tag
            className="text-capitalize"
            color={status === "active" ? "cyan" : "red"}
          >
            {status}
          </Tag>
        ),
        sorter: {
          compare: (a, b) => a.status.length - b.status.length,
        },
      },
      {
        title: "",
        dataIndex: "actions",
        render: (_, elm) => (
          <div className="text-right">
            <Tooltip title="Edit">
              <Button
                type="default"
                className="mr-2"
                icon={<EditOutlined />}
                onClick={() => {
                  navigate(`/app/clients/edit/${elm.id}`);
                }}
                size="small"
              />
            </Tooltip>
            <Tooltip title="View">
              <Button
                type="primary"
                className="mr-2"
                icon={<EyeOutlined />}
                onClick={() => {
                  this.showUserProfile(elm);
                }}
                size="small"
              />
            </Tooltip>

            <Tooltip title="Delete">
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => {
                  this.deleteUser(elm.id);
                }}
                size="small"
              />
            </Tooltip>
          </div>
        ),
      },
    ];

    return (
      <Card bodyStyle={{ padding: "0px" }}>
        <Table
          columns={tableColumns}
          dataSource={users}
          rowKey="id"
          loading={loading}
        />
        <UserView
          data={selectedUser}
          visible={userProfileVisible}
          close={() => this.closeUserProfile()}
        />
      </Card>
    );
  }
}

export default ClientList;
