"use client"

import axios from "axios";
const axiosWithCredentials = axios.create({ 
    withCredentials: true,
    baseURL: "http://localhost:4000",
 });

const COURSES_API = "/api/courses";
const QUIZZES_API = "/api/quizzes";

export const findQuizzesForCourse = async (courseId: string) => {
    const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/quizzes`);
    return response.data;
}

export const createQuizForCourse = async (courseId: string) => {
    const response = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/quizzes`);
    return response.data;
}

export const findQuizById = async (quizId: string) => {
    const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
    return response.data;
}

export const updateQuiz = async (quizId: string, updates: any) => {
    const response = await axiosWithCredentials.put(`${QUIZZES_API}/${quizId}`, updates);
    return response.data;
}

export const deleteQuiz = async (quizId: string) => {
    const response = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
    return response.data;
}