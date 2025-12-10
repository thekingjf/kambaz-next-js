"use client";

import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import * as quizClient from "../client";
import QuestionItem, { Question as QuestionModel,} from "./QuestionItem";

type Props = {
  quizId: string;
};

export default function QuizQuestionsEditor({ quizId }: Props) {
    const [questions, setQuestions] = useState<QuestionModel[]>([]);
    const [lastNewQuestionId, setLastNewQuestionId] = useState<string | null>(null);

    const loadQuestions = async () => {
        const data = await quizClient.findQuestionsForQuiz(quizId);
        setQuestions(data);
    };

    const handleNewQuestion = async () => {
        const newQuestion = await quizClient.createQuestionForQuiz(quizId);
        setQuestions((prev) => [...prev, newQuestion]);
        setLastNewQuestionId(newQuestion._id);
    };

    useEffect(() => {
        loadQuestions();
    }, [quizId]);

    const totalPoints = questions.reduce(
        (sum, q) => sum + (typeof q.points === "number" ? q.points : 0), 0);

    return (
        <div id="wd-quiz-questions-editor">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h3 className="mb-0">
                        Questions ({questions.length})
                    </h3>
                    <div className="text-muted small">
                        Total points: {totalPoints}
                    </div>
                </div>
                <Button variant="primary" onClick={handleNewQuestion}>
                    + Question
                </Button>
            </div>
    
            {questions.length === 0 && (
                <p className="text-muted">
                    No questions yet. Click + Question to
                    make one.
                </p>
            )}
    
            {questions.map((q) => (
                <QuestionItem
                    key={q._id}
                    question={q}
                    initiallyEditing={q._id === lastNewQuestionId}
                    onUpdated={(updated) => 
                        setQuestions((prev) =>
                            prev.map((qq) =>
                                qq._id === updated._id ? updated : qq
                            )
                    )
                    }
                    onDeleted={(id) =>
                    setQuestions((prev) =>
                        prev.filter((qq) => qq._id !== id)
                    )
                    }
                />
            ))}
        </div>
        );
    }