import React, { useState } from "react";
import { Button, Form, Input, Spin, notification } from "antd";
import { DatePicker } from "antd";
import { calculateAge } from "../helper/commonHelper";
import { MIN_STUDENT_AGE } from "../constants/config";
import { createStudent } from "../helper/apis";

const NewStudent = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const openSuccessNotification = () => {
    api["success"]({
      message: "Student created successfully",
      description:
        "New student is added to the systems. Please create a new student",
      duration: 10000,
    });
  };

  const openFailedNotification = () => {
    api["error"]({
      message: "Unable to create student",
      description: "Please check all the fields and try submitting student",
      duration: 10000,
    });
  };

  const onFinish = async (values) => {
    const payload = {
      first_name: values?.first_name,
      family_name: values?.family_name,
      dob: values?.dob?.format("YYYY-MM-DD"),
      email: values?.email,
    };
    setLoading(true);
    try {
      const data = await createStudent(payload);
      form.resetFields();
      openSuccessNotification();
    } catch (error) {
      console.error("Error creating student", error);
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
      tip="Storing student information on server"
      delay={500}
    >
      {contextHolder}
      <Form
        name="student_form"
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
          label="First Name"
          name="first_name"
          rules={[{ required: true, message: "Please input your Firstname!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Family Name"
          name="family_name"
          rules={[{ required: true, message: "Please input your Familyname!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email Address"
          name="email"
          rules={[
            { required: true, message: "Please input your Email Address!" },
            { type: "email", message: "Please enter valid Email address!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Date Of Birth"
          name="dob"
          rules={[
            { required: true },
            () => ({
              validator(_, value) {
                if (calculateAge(value) >= MIN_STUDENT_AGE) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    `Student Age must be greater than ${MIN_STUDENT_AGE} years!`
                  )
                );
              },
            }),
          ]}
        >
          <DatePicker format={"YYYY-MM-DD"} />
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

export default NewStudent;
