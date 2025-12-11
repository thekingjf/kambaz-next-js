"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card, Form, ListGroup } from "react-bootstrap";
import * as quizClient from "../../client";

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
};

type QuestionType =
  | "MULTIPLE_CHOICE"
  | "TRUE_FALSE"
  | "FILL_IN_BLANK";

type Choice = {
  _id: string;
  text: string;
  isCorrect: boolean;
};

type Question = {
  _id: string;
  quizId: string;
  type: QuestionType;
  title: string;
  points: number;
  questionText: string;
  choices: Choice[];
  correctBoolean?: boolean;
  correctAnswer?: string[];
};

type AnswerState = {
  choiceId?: string;
  booleanAnswer?: boolean;
  fillAnswers?: string[];
};

export default function QuizPreviewPage() {
    const { cid, qid } = useParams() as { cid: string; qid: string };
    const router = useRouter();

    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [answers, setAnswers] = useState<Record<string, AnswerState>>({});
    const [results, setResults] = useState<Record<string, boolean>>({});
    const [score, setScore] = useState<number | null>(null);
    const [totalPoints, setTotalPoints] = useState<number>(0);

    const loadData = async () => {
        const quizData = await quizClient.findQuizById(qid);
        const questionData = await quizClient.findQuestionsForQuiz(qid);

        setQuiz(quizData);
        setQuestions(questionData);
        setCurrentIndex(0);
        setAnswers({});
        setResults({});
        setScore(null);

        const total = questionData.reduce((sum: number, q: Question) =>
            sum + (typeof q.points === "number" ? q.points : 0), 0);
        setTotalPoints(total);
    }

    useEffect(() => {
        loadData();
    }, [qid]);

    const handleSelectChoice = (questionId: string, choiceId: string) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: {
            ...prev[questionId],
            choiceId,
            },
        }));
    };

    const handleSelectBoolean = (questionId: string, value: boolean) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: {
              ...prev[questionId],
              booleanAnswer: value,
            },
        }));
    };

    const handleFillAnswerChange = (questionId: string, index: number, value: string) => {
        setAnswers((prev) => {
            const existing = prev[questionId]?.fillAnswers || [];
            const arr = [...existing];
            arr[index] = value;
            return {
                ...prev,
                [questionId]: {
                    ...prev[questionId],
                    fillAnswers: arr,
                },
            }
        })
    };

    const goPrev = () => {
        setCurrentIndex((idx) => Math.max(0, idx - 1));
    };

    const goNext = () => {
        setCurrentIndex((idx) => Math.min(questions.length - 1, idx + 1));
    };

    const goToIndex = (index: number) => {
        setCurrentIndex(index);
    };

    const gradeQuiz = () => {
        const newResults: Record<string, boolean> = {};
        let earned = 0;

        questions.forEach((q) => {
            const points = typeof q.points === "number" ? q.points : 0;
            const answer = answers[q._id];
            let correct = false;

            if (q.type === "MULTIPLE_CHOICE") {
                const correctChoice  = q.choices.find((c) => c.isCorrect);
                if (correctChoice && answer?.choiceId) {
                    correct = answer.choiceId === correctChoice._id;
                } else {
                    correct = false;
                }
            } else if (q.type === "TRUE_FALSE") {
                if (typeof q.correctBoolean === "boolean") {
                    correct = answer?.booleanAnswer === q.correctBoolean;
                }
            } else if (q.type === "FILL_IN_BLANK") {
                const correctList = q.correctAnswer?.map((s) => 
                    s.trim().toLowerCase()) || [];
                const answerList = answer?.fillAnswers?.map((s) =>
                    s.trim().toLowerCase()) || [];

                if (correctList.length > 0 && answerList.length > 0) {
                    correct = answerList.every((a) => correctList.includes(a));
                }
            }

            newResults[q._id] = correct;
            if (correct) {
                earned += points;
            }
        });

        setResults(newResults);
        setScore(earned);
    }

    if (!quiz) {
        return <div>Loading quiz preview...</div>;
    }

    if (questions.length === 0) {
        return (
            <div>
                <h2>Quiz Preview: {quiz.title || "Quiz"}</h2>
                <p className="text-muted">
                There are 0 questions for this quiz.
                </p>
                <Button
                    variant="secondary"
                    onClick={() =>
                        router.push(`/Courses/${cid}/Quizzes/${qid}/edit`)
                    }
                >
                    Edit Quiz
                </Button>
            </div>
        );
    }

    const currentQuestion = questions[currentIndex];
    const currentAnswer = answers[currentQuestion._id] || {};
    const isCorrect = results[currentQuestion._id];
    const questionNumber = currentIndex + 1;
    const totalQuestions = questions.length;

    return (
        <div id="wd-quiz-preview">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h2 className="mb-1">
                        Quiz Preview: {quiz.title || "Quiz"}
                    </h2>
                    <div className="text-muted small">
                        Question {questionNumber} of {totalQuestions} - Total points: {totalPoints}
                    </div>
                    {score !== null && (
                        <div className="mt-1">
                            <strong>Score:</strong> {score} / {totalPoints}
                        </div>
                    )}
                </div>
                <div className="d-flex gap-2">
                    <Button
                        variant="secondary"
                        onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}`)}
                    >
                        Back
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() =>
                            router.push(`/Courses/${cid}/Quizzes/${qid}/edit`)
                        }
                    >
                        Edit
                    </Button>
                </div>
            </div>

            <Card className="mb-3">
                <Card.Body>
                    <div className="d-flex flex-wrap gap-2">
                        {questions.map((q, index) => {
                            const qNum = index + 1;
                            const answered =
                            Boolean(answers[q._id]) &&
                            (answers[q._id].choiceId !== undefined ||
                                answers[q._id].booleanAnswer !== undefined ||
                                (answers[q._id].fillAnswers &&
                                answers[q._id].fillAnswers!.some(
                                    (s) => s && s.trim() !== ""
                                )));

                            return (
                                <Button
                                    key={q._id}
                                    variant={
                                        index === currentIndex
                                        ? "dark" 
                                        : "secondary"
                                    }
                                    size="sm"
                                    onClick={() => goToIndex(index)}
                                >
                                    {qNum}
                                </Button>
                            );
                        })};
                    </div>
                </Card.Body>
            </Card>

            <Card className="mb-3">
                <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                        <Card.Title className="mb-1">
                            {currentQuestion.title || `Question ${questionNumber}`}
                        </Card.Title>
                        <Card.Subtitle className="text-muted">
                            {currentQuestion.type.replace("_", " ")} ·{" "}
                            {currentQuestion.points ?? 0} pts
                        </Card.Subtitle>
                    </div>
                    {score !== null && (
                        <div className="ms-3">
                            {isCorrect === true && (
                                <span className="text-success fw-bold">
                                    Correct
                                </span>
                            )}
                            {isCorrect === false && (
                                <span className="text-danger fw-bold">
                                    Incorrect
                                </span>
                            )}
                        </div>
                    )}
                </div>

                <p>{currentQuestion.questionText || ""}</p>

                <Form>
                    {currentQuestion.type === "MULTIPLE_CHOICE" && (
                        <Form.Group>
                            <ListGroup>
                                {currentQuestion.choices.map((choice) => (
                                    <ListGroup.Item key={choice._id}>
                                        <Form.Check
                                            type="radio"
                                            name={`preview-mc-${currentQuestion._id}`}
                                            label={choice.text}
                                            checked={
                                                currentAnswer.choiceId === choice._id
                                            }
                                            onChange={() =>
                                            handleSelectChoice(
                                                currentQuestion._id,
                                                choice._id
                                            )
                                            }
                                        />
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Form.Group>
                    )}
    
                {currentQuestion.type === "TRUE_FALSE" && (
                    <Form.Group>
                        <div className="d-flex gap-3">
                            <Form.Check
                                type="radio"
                                label="True"
                                name={`preview-tf-${currentQuestion._id}`}
                                checked={currentAnswer.booleanAnswer === true}
                                onChange={() =>
                                handleSelectBoolean(
                                    currentQuestion._id,
                                    true
                                )}
                            />
                            <Form.Check
                                type="radio"
                                label="False"
                                name={`preview-tf-${currentQuestion._id}`}
                                checked={currentAnswer.booleanAnswer === false}
                                onChange={() =>
                                handleSelectBoolean(
                                    currentQuestion._id,
                                    false
                                )}
                            />
                        </div>
                    </Form.Group>
                )}
    
                {currentQuestion.type === "FILL_IN_BLANK" && (
                    <Form.Group>
                        <Form.Label>Answer(s)</Form.Label>
                        {(currentQuestion.correctAnswer || [""]).map(
                            (_ans, index) => (
                        <Form.Control
                            key={index}
                            className="mb-2"
                            value={
                                currentAnswer.fillAnswers?.[index] || ""
                            }
                            onChange={(e) =>
                                handleFillAnswerChange(
                                currentQuestion._id,
                                index,
                                e.target.value
                            )}
                            placeholder={`Blank ${index + 1}`}
                        />
                            )
                        )}
                  </Form.Group>
                )}
                </Form>
            </Card.Body>
        </Card>
    
        <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex gap-2">
                <Button
                    variant="secondary"
                    disabled={currentIndex === 0}
                    onClick={goPrev}
                >
                    Previous
                </Button>
                <Button
                    variant="secondary"
                    disabled={currentIndex === questions.length - 1}
                    onClick={goNext}
                >
                    Next
                </Button>
            </div>
                <Button variant="primary" onClick={gradeQuiz}>
                Check Answers
                </Button>
            </div>
    </div>
    );
}