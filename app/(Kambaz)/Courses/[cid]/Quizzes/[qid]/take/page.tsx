"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap"
import * as client from "../../client";

type Question = {
  _id: string;
  type: "MULTIPLE_CHOICE" | "TRUE_FALSE" | "FILL_IN_BLANK";
  title: string;
  points: number;
  question: string;
  choices?: { _id: string; text: string; isCorrect: boolean }[];
  correctBoolean?: boolean;
  questionText: string;
  correctAnswer?: string[];
};

export default function TakeQuizPage() {
    const { cid, qid } = useParams() as { cid: string; qid: string };
    const router = useRouter();
    const [quiz, setQuiz] = useState<any | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [attempt, setAttempt] = useState<any | null>(null);
    const [lastAttemptInfo, setLastAttemptInfo] = useState<any | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [accessGranted, setAccessGranted] = useState(false);
    const [accessCodeInput, setAccessCodeInput] = useState("");
    const [accessError, setAccessError] = useState<string | null>(null);

    const loadData = async() => {
        const quiz = await client.findQuizById(qid);
        let questions = await client.findQuestionsForQuiz(qid);

        if (quiz.shuffleAnswers) {
            questions = questions.map((q: Question) => ({
                ...q,
                choices: q.choices
                ? [...q.choices].sort(() => Math.random() - 0.5)
                : q.choices,
            }));
        }

        setQuiz(quiz);
        setQuestions(questions);
        setCurrentIndex(0);

        try {
            const last = await client.findMyLastQuizAttempt(qid);
            setLastAttemptInfo(last || null);
        
            if (last && quiz.multipleAttempts && quiz.maxAttempts 
                && last.attemptNumber >= quiz.maxAttempts ) {
              setAttempt(last);
            }
        } catch {
            setLastAttemptInfo(null);
        }

        if (!quiz.accessCode || quiz.accessCode.trim() === "") {
            setAccessGranted(true);
        } else {
            setAccessGranted(false);
            setAccessCodeInput("");
            setAccessError(null);
        }

        if (quiz.timeLimitEnabled && quiz.timeLimitMinutes) {
            setRemainingSeconds(quiz.timeLimitMinutes * 60);
        } else {
            setRemainingSeconds(null);
        }

        setAnswers({})
        
    };

    const formatTime = (seconds : number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    }

    useEffect(() => {
        if (!quiz) return;
        if (!quiz.timeLimitEnabled || !quiz.timeLimitMinutes) return;
        if (attempt || isSubmitting) return;
        if (remainingSeconds === null) return;
        if (!accessGranted) return;
      
        const tick = setInterval(() => {
          setRemainingSeconds((prev) => {
            if (prev === null) return prev;
            if (prev <= 1) {
              clearInterval(tick);
      
              if (!attempt && !isSubmitting) {
                handleSubmit();
              }
      
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      
        return () => clearInterval(tick);
      }, [quiz, attempt, isSubmitting, remainingSeconds, accessGranted]);

    useEffect(() => {
        loadData();
    }, [qid]);

    const handleMultipleChoiceChange = (questionId: string, choiceId: string) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: { ...prev[questionId], choiceId },
        }));
    };

    const handleTrueFalseChange = (questionId: string, value: boolean) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: { ...prev[questionId], booleanAnswer: value },
        }));
    };

    const handleFillChange = (questionId: string, value: string) => {
        setAnswers((prev) => ({
          ...prev,
          [questionId]: { ...prev[questionId], fillAnswers: [value] },
        }));
    };

    const handleSubmit = async () => {
        if (attempt || isSubmitting) return;
        setIsSubmitting(true);
        try {
            const newAttempt = await client.submitQuizAttempt(qid, answers);
            setAttempt(newAttempt);
            setLastAttemptInfo(newAttempt);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!quiz) {
        return <div>Loading quiz...</div>;
    }

    const attemptsUsed = attempt ? attempt.attemptNumber : lastAttemptInfo?.attemptNumber ?? 0;
    const outOfAttempts = quiz.multipleAttempts && quiz.maxAttempts
            ? attemptsUsed >= quiz.maxAttempts
            : attemptsUsed >= 1;
    const reviewAttempt = attempt ?? (outOfAttempts ? lastAttemptInfo : null);
    const isReviewing = !!reviewAttempt;

    if (!accessGranted && !outOfAttempts) {
        return (
            <div className="wd-take-quiz">
                <h2>{quiz.title}</h2>
                <p>Provide Access Code</p>
                <Form
                    onSubmit={(e) => {
                        e.preventDefault()
                        if (quiz.accessCode && accessCodeInput.trim() === quiz.accessCode.trim()) {
                            setAccessGranted(true);
                            setAccessError(null);
                        } else {
                            setAccessError("Incorrect code. Try again.");
                        }
                    }}    
                >
                    <Form.Group className="mb-3" style={{ maxWidth: 320 }}>
                        <Form.Label>Access code</Form.Label>
                        <Form.Control
                            type="text"
                            value={accessCodeInput}
                            onChange={(e) => setAccessCodeInput(e.target.value)}
                        />
                        {accessError && (
                            <div className="text-danger mt-1 small">{accessError}</div>
                        )}
                    </Form.Group>
                    <Button type="submit" variant="primary">
                        Start Quiz
                    </Button>
                    <Button
                        variant="secondary"
                        className="ms-2"
                        onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}`)}
                    >
                        Back
                    </Button>
                </Form>
            </div>
    )}

    const answerByQuestionId: Record<string, any> = {};
    reviewAttempt?.answers?.forEach((a: any) => {
        answerByQuestionId[a.questionId] = a;
    });

    const canShowAnswers = () => {
        if (!attempt) return false;
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
                    Attempt {attempt ? attempt.attemptNumber : attemptsUsed + 1} 
                </div>
            )}

            {quiz.timeLimitEnabled && quiz.timeLimitMinutes && remainingSeconds !== null && (
                <div className="mb-3 fw-semibold">
                    Time remaining: {formatTime(remainingSeconds)}
                </div>
            )}

            {attempt && (
                <div className="mt-3 mb-3">
                    <h4>
                    Score: {attempt.score} / {attempt.maxScore}
                    </h4>
                </div>
            )}

            {visibleQuestions.map((q) => {
                const submitted = isReviewing 
                    ? (answerByQuestionId[q._id] || {})
                    : (answers[q._id] || {});
                
                const hasAnswered = submitted.choiceId !== undefined 
                || submitted.booleanAnswer !== undefined 
                || (submitted.fillAnswers && submitted.fillAnswers.some(
                    (s: string) => s && s.trim() !== ""
                ));

                const questionLockedDuringAttempt = quiz.lockQuestionsAfterAnswering && hasAnswered && !attempt;

                const disabled = isReviewing || questionLockedDuringAttempt;

                const status = showCorrectness && attempt && submitted
                        ? submitted.isCorrect
                        ? "Correct"
                        : "Incorrect"
                        : "";

                return(
                    <div key={q._id} className="card mb-3">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h5 className="card-title">
                                    {q.title} ({q.points} pts) 
                                </h5>
                                {status && (
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
                                            onChange={() =>
                                                handleMultipleChoiceChange(q._id, choice._id)
                                            }
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
                                        onChange={() => handleTrueFalseChange(q._id, true)}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="False"
                                        name={`q-${q._id}`}
                                        disabled={disabled}
                                        checked={submitted.booleanAnswer === false}
                                        onChange={() => handleTrueFalseChange(q._id, false)}
                                    />
                                </Form>
                            )}

                            {q.type === "FILL_IN_BLANK" && (
                                <Form.Control
                                    type="text"
                                    disabled={disabled}
                                    value={submitted.fillAnswers?.[0] ?? ""}
                                    onChange={(e) => handleFillChange(q._id, e.target.value)}
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
          
            {!attempt && !outOfAttempts && (
                <Button 
                    className="mt-3" 
                    disabled={isSubmitting}
                    onClick={() => handleSubmit()}
                >
                    Submit
                </Button>
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