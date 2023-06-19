import React, { useEffect, useState } from "react";
import { Button, Form, Select, Spin, notification } from "antd";
import {
  createScore,
  createStudent,
  fetchCourses,
  fetchStudents,
} from "../helper/apis";
import { SCORE_VALUES } from "../constants/config";

const NewResult = () => {
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  const openSuccessNotification = () => {
    api["success"]({
      message: "Score added successfully",
      description: "New Score is added to the systems. Please add new score",
      duration: 10000,
    });
  };

  const openFailedNotification = () => {
    api["error"]({
      message: "Unable to create score",
      description: "Please check all the fields and try submitting score",
      duration: 10000,
    });
  };

  const fetchCoursesList = () => {
    setCoursesLoading(true);
    fetchCourses()
      .then(({ data }) => {
        setCourses(data?.data);
      })
      .catch((err) => console.log("error fetching courses", err))
      .finally(() => setCoursesLoading(false));
  };

  const fetchStudentsList = () => {
    setStudentsLoading(true);
    fetchStudents()
      .then(({ data }) => {
        setStudents(data?.data);
      })
      .catch((err) => console.log("error fetching students", err))
      .finally(() => setStudentsLoading(false));
  };

  useEffect(() => {
    fetchCoursesList();
    fetchStudentsList();
  }, []);

  const onFinish = async (values) => {
    const { student_id, course_id, score } = values;
    const payload = {
      student_id,
      course_id,
      score,
    };
    setLoading(true);
    try {
      const data = await createScore(payload);
      form.resetFields();
      openSuccessNotification();
    } catch (error) {
      console.error("Error creating score", error);
      openFailedNotification();
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const generateStudentOptions = () => {
    return students?.map((student) => ({
      label: `${student.first_name} ${student.family_name}`,
      value: student.student_id,
    }));
  };

  const generateCourseOptions = () => {
    return courses?.map((course) => ({
      label: course?.course_name,
      value: course.course_id,
    }));
  };

  const generateScoreOptions = () => {
    return SCORE_VALUES?.map((score) => ({
      label: score,
      value: score,
    }));
  };

  const openSpinner = studentsLoading || coursesLoading || loading;
  const spinnerMsg = loading
    ? "Uploading score to database"
    : studentsLoading
    ? "Fetching students info.."
    : "Fetcing Courses info..";

  return (
    <Spin spinning={openSpinner} tip={spinnerMsg} delay={500}>
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
          label="Student Name"
          name="student_id"
          rules={[{ required: true, message: "Please select student !" }]}
        >
          <Select
            showSearch
            placeholder="Select a student"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={generateStudentOptions()}
          />
        </Form.Item>

        <Form.Item
          label="Course Name"
          name="course_id"
          rules={[{ required: true, message: "Please select course!" }]}
        >
          <Select
            showSearch
            placeholder="Select a course"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={generateCourseOptions()}
          />
        </Form.Item>

        <Form.Item
          label="Score"
          name="score"
          rules={[{ required: true, message: "Please select Score!" }]}
        >
          <Select
            showSearch
            placeholder="Select a Score"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={generateScoreOptions()}
          />
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

export default NewResult;
