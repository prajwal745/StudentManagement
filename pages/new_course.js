import React, { useState } from "react";
import { Button, Form, Input, Spin, notification } from "antd";
import { createCourse } from "../helper/apis";

const NewCourse = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const openSuccessNotification = () => {
    api["success"]({
      message: "Course created successfully",
      description:
        "New Course is added to the systems. Please create a new Course",
      duration: 10000,
    });
  };

  const openFailedNotification = () => {
    api["error"]({
      message: "Unable to create Course",
      description: "Please check all the fields and try submitting Course",
      duration: 10000,
    });
  };

  const onFinish = async (values) => {
    const payload = {
      course_name: values?.course_name,
    };
    setLoading(true);
    try {
      const data = await createCourse(payload);
      form.resetFields();
      openSuccessNotification();
    } catch (error) {
      console.error("Error creating course", error);
      openFailedNotification();
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Spin
      spinning={loading}
      tip="Storing Course information on server"
      delay={500}
    >
      {contextHolder}
      <Form
        name="course_form"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Course Name"
          name="course_name"
          rules={[
            { required: true, message: "Please input your course name!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default NewCourse;
