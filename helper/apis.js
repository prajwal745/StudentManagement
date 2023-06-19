import axios from "axios";
import { COURSE_ROUTE, SCORE_ROUTE, STUDENT_ROUTE } from "../constants/endpoints";

export const createStudent = (payload) => {
  return axios.post(STUDENT_ROUTE, payload);
};

export const fetchStudents = () => {
  return axios.get(STUDENT_ROUTE);
};

export const deleteStudent = (id) => {
  return axios.delete(`${STUDENT_ROUTE}/${id}`);
};

export const fetchCourses = () => {
  return axios.get(COURSE_ROUTE);
};

export const createCourse = (payload) => {
  return axios.post(COURSE_ROUTE, payload);
};

export const deleteCourse = () => {
  return axios.delete(COURSE_ROUTE);
};

export const createScore = (payload) => {
  return axios.post(SCORE_ROUTE, payload);

}