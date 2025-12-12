"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import * as quizClient from "../client";
import GreenCheckmark from "../../Modules/GreenCheckmark";
import { FaCircle } from "react-icons/fa6";

type Quiz = {
    _id: string;
    courseId: string;
    title: string;
    description: string;
    published: boolean;
    availableDate?: string;
    untilDate?: string;
    dueDate?: string;
    points: number;
    shuffleAnswers?: boolean;
    timeLimitEnabled?: boolean;
    timeLimitMinutes?: number;
    quizType?: string;
    assignmentGroup?: string;
    multipleAttempts?: boolean;
    maxAttempts?: number;
    showCorrectAnswers?: boolean;
    showCorrectAnswersAt?: string;
    accessCode?: string;
    oneQuestionAtATime?: boolean;
    webcamRequired?: boolean;
    lockQuestionsAfterAnswering?: boolean;
};

type QuizAttempt = {
    _id: string;
    score: number;
    maxScore: number;
    attemptNumber: number;
    submittedAt?: string;
};

export default function QuizDetails() { 
    const { cid, qid } = useParams() as { cid: string; qid: string };
    const router = useRouter();

    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [totalPoints, setTotalPoints] = useState<number | null>(null);
    const [lastAttempt, setLastAttempt] = useState<QuizAttempt | null>(null);

    const currentUser = useSelector((state: RootState) => state.accountReducer.currentUser) as any;

    const isFaculty = currentUser?.role === "FACULTY";
    const isStudent = currentUser?.role === "STUDENT";


    const loadQuiz = async () => {
        const data = await quizClient.findQuizById(qid);
        setQuiz(data);
    }

    const handleTogglePublish = async () => {
        if (!quiz) return;
        const updated = await quizClient.updateQuiz(quiz._id, {
            published: !quiz.published,
        });
        setQuiz(updated)
    }

    const toDate = (value?: string) => {
        if (!value) return "-";
        const date = new Date(value);
        return date.toLocaleString();
    };

    const handlePreview = () => {
        router.push(`/Courses/${cid}/Quizzes/${qid}/preview`);
    }

    const loadTotalPoints = async () => {
        const questions = await quizClient.findQuestionsForQuiz(qid);
        const sum = questions.reduce(
            (acc: number, q: any) => acc + (typeof q.points === "number" ? q.points : 0), 0);
        setTotalPoints(sum);
    };

    const loadLastAttempt = async () => {
        if (!isStudent) return;
        const attempt = await quizClient.findMyLastQuizAttempt(qid);
        setLastAttempt(attempt); 
    };

    useEffect(() => {
        loadQuiz();
        loadTotalPoints();
        loadLastAttempt();
    }, [qid, isStudent]);

    if (!quiz) {
        return <div>Loading quiz...</div>;
    }

    const now = new Date();
    const availableFrom = quiz.availableDate ? new Date(quiz.availableDate) : null;
    const availableUntil = quiz.untilDate ? new Date(quiz.untilDate) : null;

    const withinWindow =
    (!availableFrom || now >= availableFrom) &&
    (!availableUntil || now <= availableUntil);

    

    const showAnswers = () => {
        if (!quiz.showCorrectAnswers) return "No";
        if (!quiz.showCorrectAnswersAt) return "Yes";
        return `Yes starting on ${toDate(quiz.showCorrectAnswersAt)}`;
    };

    const published = quiz.published ? <GreenCheckmark /> : <FaCircle className="text-white me-1 fs-6" />
    const attemptsUsed = lastAttempt?.attemptNumber ?? 0;
    const maxAttempts = quiz.multipleAttempts ? (quiz.maxAttempts ?? 1) : 1;
    const outOfAttempts = !!lastAttempt && attemptsUsed >= maxAttempts;
    const canReview = Boolean(lastAttempt);
    const canTake = quiz.published && withinWindow && (!lastAttempt || !outOfAttempts);

    return (
        <div id="wd-quiz-details">
            <h2>{quiz.title || "Quiz"}</h2>
            <p className="text-muted"> {published}</p>
            <hr />

            <div className="mb-3">
                <strong>Description</strong>
                <p>{quiz.description || "No description"}</p>
            </div>

            <div className="mb-3">
                <strong>Quiz Type: </strong>
                <p>{quiz.quizType ?? "Graded Quiz"}</p>
            </div>

            <div className="mb-3">
                <strong>Assignment Group: </strong>
                <p>{quiz.assignmentGroup || "Quizzes"}</p>
            </div>

            <div className="mb-2">
                <strong>Points:</strong> {totalPoints !== null ? totalPoints : quiz.points ?? 0}
            </div>

            <div className="mb-2">
                <strong>Available From: </strong>
                {toDate(quiz.availableDate)}
            </div>

            <div className="mb-2">
                <strong>Available Until: </strong>
                {toDate(quiz.untilDate)}
            </div>

            <div className="mb-2">
                <strong>Due Date: </strong>
                {toDate(quiz.dueDate)}
            </div>

            <div className="mb-2">
                <strong>Shuffle Answers: </strong>
                {quiz.shuffleAnswers ? "Yes" : "No"}
            </div>

            <div className="mb-2">
                <strong>Time Limit: </strong>
                {quiz.timeLimitEnabled
                    ? `${quiz.timeLimitMinutes ?? 20} minutes`
                    : "No time limit"}
            </div>

            <div className="mb-2">
                <strong>Multiple Attempts: </strong>
                {quiz.multipleAttempts ? "Yes" : "No"}
            </div>

            {quiz.multipleAttempts && (
                <div className="mb-2">
                    <strong>How Many Attempts: </strong>
                    {quiz.maxAttempts ?? 1}
                </div>
            )}

            <div className="mb-2">
                <strong>Show Correct Answers: </strong>
                {showAnswers()}
            </div>

            <div className="mb-2">
                <strong>Access Code: </strong>
                {quiz.accessCode ? "Yes" : "No"}
            </div>

            <div className="mb-2">
                <strong>One Question at a Time: </strong>
                {quiz.oneQuestionAtATime ? "Yes" : "No"}
            </div>

            <div className="mb-2">
                <strong>Webcam Required: </strong>
                {quiz.webcamRequired ? "Yes" : "No"}
            </div>

            <div className="mb-2">
                <strong>Lock Questions After Answering: </strong>
                {quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}
            </div>

            {isStudent && lastAttempt && (
                <div className="mb-2">
                    <strong>Your score: </strong>
                    {lastAttempt.score} / {lastAttempt.maxScore} (Attempt #
                    {lastAttempt.attemptNumber})
                </div>
            )}

            {isStudent && quiz.multipleAttempts && quiz.maxAttempts && (
                <div className="mb-2">
                    <strong>Attempts used:</strong> {attemptsUsed} /{" "}
                    {quiz.maxAttempts}
                </div>
            )}

            <hr />
            {isStudent && !lastAttempt && (
                <div className="mb-2 text-muted">You have not attempted this quiz yet.</div>
            )}
            <hr />

            <div className="d-flex gap-2">
                <Button 
                    variant="dark"
                    onClick={() => router.push(`/Courses/${cid}/Quizzes`)}
                >
                    Back
                </Button>

                {isFaculty && (
                    <div>
                        <Button 
                            variant={quiz.published ? "danger" : "success"}
                            onClick={handleTogglePublish}
                        >
                            {quiz.published ? "Unpublish" : "Publish"}
                        </Button>

                        <Button 
                            variant="primary"
                            as={Link as any}
                            href={`/Courses/${cid}/Quizzes/${qid}/edit`}
                        >
                            Edit
                        </Button>

                        <Button 
                            variant="secondary"
                            onClick={() => {handlePreview()}}
                        >
                            Preview
                        </Button>
                    </div>)}

                {isStudent && ( 
                    <div> 
                        {canTake && (
                            <Button
                                variant="primary"
                                onClick={() =>
                                    router.push(`/Courses/${cid}/Quizzes/${qid}/take`)
                                }
                            >
                                {!lastAttempt ? "Take Quiz" : "Retake Quiz"}
                            </Button>
                        )}
                        {canReview && (
                            <Button
                                variant="secondary"
                                onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/review`)}
                            >
                            View Results
                            </Button>
                        )}
                    </div>
                )}

                {isStudent && !quiz.published && (
                    <div className="text-muted">This quiz is not published yet.</div>
                )}
            </div>
        </div>
    );
}