import React, { Component } from "react";
import {
  Form,
  Avatar,
  Button,
  Input,
  Row,
  Col,
  message,
  Upload,
  Spin,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { ROW_GUTTER } from "constants/ThemeConstant";
import Flex from "components/shared-components/Flex";
import { API_BASE_URL } from "configs/AppConfig";

export class EditProfile extends Component {
  avatarEndpoint = "https://www.mocky.io/v2/5cc8019d300000980a055e76";

  state = {
    avatarUrl: null,
    name: "",
    email: "",
    userName: "",
    dateOfBirth: null,
    phoneNumber: "",
    website: "",
    address: "",
    city: "",
    postcode: "",
    loading: true,
  };

  componentDidMount() {
    const { userId } = this.props;
    this.fetchUserData(userId);
  }

  fetchUserData = async (userId) => {
    this.setState({ loading: true });
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`);
      const user = await response.json();
      this.setState({
        name: user.name,
        email: user.email,
        userName: user.username,
        phoneNumber: user.phone,
        website: user.website,
        address: user.address?.street || "",
        city: user.address?.city || "",
        postcode: user.address?.zipcode || "",
        loading: false,
      });
    } catch (error) {
      console.error("Ошибка при загрузке данных пользователя:", error);
      message.error("Не удалось загрузить данные пользователя");
      this.setState({ loading: false });
    }
  };

  getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(file);
  };

  onFinish = (values) => {
    const key = "updatable";
    message.loading({ content: "Updating...", key });
    setTimeout(() => {
      this.setState({
        name: values.name,
        email: values.email,
        userName: values.userName,
        dateOfBirth: values.dateOfBirth,
        phoneNumber: values.phoneNumber,
        website: values.website,
        address: values.address,
        city: values.city,
        postcode: values.postcode,
      });
      message.success({ content: "Done!", key, duration: 2 });
      this.props.navigate("/app/clients/list");
    }, 1000);
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  onUploadAavater = (info) => {
    const key = "updatable";
    if (info.file.status === "uploading") {
      message.loading({ content: "Uploading...", key, duration: 1000 });
      return;
    }
    if (info.file.status === "done") {
      this.getBase64(info.file.originFileObj, (imageUrl) => {
        this.setState({
          avatarUrl: imageUrl,
        });
        message.success({ content: "Uploaded!", key, duration: 1.5 });
      });
    }
  };

  onRemoveAvater = () => {
    this.setState({
      avatarUrl: null,
    });
  };

  render() {
    const {
      name,
      email,
      userName,
      dateOfBirth,
      phoneNumber,
      website,
      address,
      city,
      postcode,
      avatarUrl,
      loading,
    } = this.state;

    if (loading) {
      return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <Spin size="large" />
        </div>
      );
    }

    return (
      <>
        <Flex
          alignItems="center"
          mobileFlex={false}
          className="text-center text-md-left"
        >
          <Avatar size={90} src={avatarUrl} icon={<UserOutlined />} />
          <div className="ml-md-3 mt-md-0 mt-3">
            <Upload
              onChange={this.onUploadAavater}
              showUploadList={false}
              action={this.avatarEndpoint}
            >
              <Button type="primary">Change Avatar</Button>
            </Upload>
            <Button
              className="ml-2"
              disabled={!avatarUrl}
              onClick={this.onRemoveAvater}
            >
              Remove
            </Button>
          </div>
        </Flex>
        <div className="mt-4">
          <Form
            name="basicInformation"
            layout="vertical"
            initialValues={{
              name: name,
              email: email,
              username: userName,
              dateOfBirth: dateOfBirth,
              phoneNumber: phoneNumber,
              website: website,
              address: address,
              city: city,
              postcode: postcode,
            }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <Row>
              <Col xs={24} sm={24} md={24} lg={16}>
                <Row gutter={ROW_GUTTER}>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      label="Name"
                      name="name"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      rules={[
                        {
                          required: true,
                          message: "Please input your name!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      label="Username"
                      name="username"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      label="Email"
                      name="email"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      rules={[
                        {
                          required: true,
                          type: "email",
                          message: "Please enter a valid email!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      label="Phone Number"
                      name="phoneNumber"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      label="Website"
                      name="website"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24}>
                    <Form.Item
                      label="Address"
                      name="address"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      label="City"
                      name="city"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      label="Post code"
                      name="postcode"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Button type="primary" htmlType="submit">
                  Save Change
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </>
    );
  }
}

export default EditProfile;
