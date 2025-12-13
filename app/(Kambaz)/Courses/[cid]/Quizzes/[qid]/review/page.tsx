"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap"
import * as client from "../../client";

type Question = {
  _id: string;
  type: "MULTIPLE_CHOICE" | "TRUE_FALSE" | "FILL_IN_BLANK";
  title: string;
  points: number;
  choices?: { _id: string; text: string; isCorrect: boolean }[];
  correctBoolean?: boolean;
  questionText: string;
  correctAnswer?: string[];
};

export default function ReviewQuizPage() {
    const { cid, qid } = useParams() as { cid: string; qid: string };
    const router = useRouter();
    const [quiz, setQuiz] = useState<any | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [lastAttempt, setLastAttempt] = useState<any | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const loadData = async() => {
        const quiz = await client.findQuizById(qid);
        const questions = await client.findQuestionsForQuiz(qid);

        setQuiz(quiz);
        setQuestions(questions);
        setCurrentIndex(0);

        try {
            const last = await client.findMyLastQuizAttempt(qid);
            setLastAttempt(last || null);
        } catch {
            setLastAttempt(null);
        }        
    };

    useEffect(() => {
        loadData();
    }, [qid]);

    const reviewAttempt = lastAttempt;
    const answerByQuestionId = useMemo(() => {
        const map: Record<string, any> = {};
        reviewAttempt?.answers?.forEach((a: any) => {
            map[a.questionId] = a;
        });
        return map;
    }, [reviewAttempt]);

    if (!quiz) {
        return <div>Loading quiz...</div>;
    }

    if (!lastAttempt) {
        return (
            <div className="wd-take-quiz">
                <h1>{quiz.title}</h1>
                <p className="text-muted">No attempts yet.</p>
                <Button
                    variant="secondary"
                onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}`)}
                >
                    Back
                </Button>
            </div>
        );
    }

    const canShowAnswers = () => {
        if (!reviewAttempt) return false;
        if(!quiz.showCorrectAnswers) return false;
        if(!quiz.showCorrectAnswersAt) return true;

        return new Date() >= new Date(quiz.showCorrectAnswersAt);
    }

    const showOneAtATime = quiz.oneQuestionAtATime;
    const visibleQuestions = showOneAtATime
        ? questions.slice(currentIndex, currentIndex + 1)
        : questions;

    const showCorrectness = canShowAnswers();

    return (
        <div className="wd-take-quiz">
            <h1>{quiz.title}</h1>
            {quiz.description && (
                <div className="mb-3">
                    <p>{quiz.description}</p>
                </div>
            )}

            {quiz.multipleAttempts && quiz.maxAttempts && (
                <div className="mb-2 text-muted">
                    Attempt {reviewAttempt.attemptNumber} / {quiz.maxAttempts}
                </div>
            )}

            {reviewAttempt && (
                <div className="mt-3 mb-3">
                    <h4>
                    Score: {reviewAttempt.score} / {reviewAttempt.maxScore}
                    </h4>
                </div>
            )}

            {!showCorrectness && quiz.showCorrectAnswers && quiz.showCorrectAnswersAt && (
                <div className="text-muted mb-3">
                    Correct answers will be available on {new Date(quiz.showCorrectAnswersAt).toLocaleString()}.
                </div>
            )}

            {visibleQuestions.map((q) => {
                const submitted = answerByQuestionId[q._id] || {};
                const disabled = true;

                const status = showCorrectness
                        ? submitted.isCorrect ? "Correct" : "Incorrect"
                        : "";

                return(
                    <div key={q._id} className="card mb-3">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h5 className="card-title">
                                    {q.title} ({q.points} pts) 
                                </h5>
                                {showCorrectness && (
                                <span className={submitted.isCorrect ? "text-success" : "text-danger"}>
                                    {status}
                                </span>
                                )}
                            </div>
                            <div className="mb-2">
                                {q.questionText}
                            </div>

                            {q.type === "MULTIPLE_CHOICE" && (
                                <Form>
                                    {q.choices?.map((choice) => (
                                        <Form.Check
                                            key={choice._id}
                                            type="radio"
                                            label={choice.text}
                                            name={`q-${q._id}`}
                                            disabled={disabled}
                                            checked={submitted.choiceId === choice._id}
                                        />
                                    ))}
                                </Form>
                            )}

                            {q.type === "TRUE_FALSE" && (
                                <Form>
                                    <Form.Check
                                    type="radio"
                                        label="True"
                                        name={`q-${q._id}`}
                                        disabled={disabled}
                                        checked={submitted.booleanAnswer === true}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="False"
                                        name={`q-${q._id}`}
                                        disabled={disabled}
                                        checked={submitted.booleanAnswer === false}
                                    />
                                </Form>
                            )}

                            {q.type === "FILL_IN_BLANK" && (
                                <Form.Control
                                    type="text"
                                    disabled={disabled}
                                    value={submitted.fillAnswers?.[0] ?? ""}
                                />
                            )}
                        </div>
                    </div>
                );
            })}

            {showOneAtATime && questions.length > 1 && (
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex gap-2">
                        <Button
                            variant="secondary"
                            disabled={currentIndex === 0}
                            onClick={() =>
                                setCurrentIndex((idx) => Math.max(0, idx - 1))
                            }
                        >
                            Previous
                        </Button>
                        <Button
                            variant="secondary"
                            disabled={currentIndex === questions.length - 1}
                            onClick={() =>
                            setCurrentIndex((idx) =>
                                Math.min(questions.length - 1, idx + 1)
                            )
                            }
                        >
                            Next
                        </Button>
                    </div>
                    <div className="text-muted">
                        Question {currentIndex + 1} of {questions.length}
                    </div>
                </div>
            )}

            <Button
                variant="secondary"
                className="mt-3 ms-2"
                onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}`)}
            >
                Back
            </Button>
        </div>
    );
}