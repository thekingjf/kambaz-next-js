"use client"

import axios from "axios";
const axiosWithCredentials = axios.create({ 
    withCredentials: true,
    baseURL: "http://localhost:4000",
 });

const COURSES_API = "/api/courses";
const QUIZZES_API = "/api/quizzes";
const QUESTIONS_API = "/api/questions";

/* ------------ QUIZZES --------------*/

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

/* ------------ QUESTIONS --------------*/

export const findQuestionsForQuiz = async (quizId: string) => {
    const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/questions`);
    return response.data;
}

export const createQuestionForQuiz = async (quizId: string) => {
    const response = await axiosWithCredentials.post(`${QUIZZES_API}/${quizId}/questions`);
    return response.data;
}

export const findQuestionById = async (questionId : string) => {
    const response = await axiosWithCredentials.get(`${QUESTIONS_API}/${questionId}`);
    return response.data;
}

export const updateQuestion = async (questionId : string, updates : any) => {
    const response = await axiosWithCredentials.put(`${QUESTIONS_API}/${questionId}`, updates);
    return response.data;
}

export const deleteQuestion = async (questionId : string) => {
    const response = await axiosWithCredentials.delete(`${QUESTIONS_API}/${questionId}`);
    return response.data;
}

/* ------------ Attempts --------------*/

export const submitQuizAttempt = async (quizId: String, answers: Record<string, any>) => {
    const response = await axiosWithCredentials.post(`${QUIZZES_API}/${quizId}/attempts`, { answers });
    return response.data
}

export const findMyLastQuizAttempt = async (quizId: String) => {
    const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/attempts/last`);
    return response.data
}