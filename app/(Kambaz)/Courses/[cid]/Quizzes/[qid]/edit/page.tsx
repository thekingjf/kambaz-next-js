"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap";
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

export default function QuizEditor() { 
    const { cid, qid } = useParams() as { cid: string; qid: string };
    const router = useRouter();
    const [quiz, setQuiz] = useState<Quiz | null>(null);

    const loadQuiz = async () => {
        const data = await quizClient.findQuizById(qid);
        setQuiz(data);
    }

    useEffect(() => {
        loadQuiz()
    }, [qid]);

    const handleChange = (field : keyof Quiz, value : number | boolean | string) => {
        if (!quiz) return
        setQuiz({ ...quiz, [field]: value } as Quiz)
    };

    const handleSave = async (publish: boolean) => {
        if (!quiz) return

        const updates = {
            title: quiz.title,
            description: quiz.description,
            points: quiz.points,
            availableDate: quiz.availableDate,
            untilDate: quiz.untilDate,
            dueDate: quiz.dueDate,
            shuffleAnswers: quiz.shuffleAnswers,
            timeLimitEnabled: quiz.timeLimitEnabled,
            timeLimitMinutes: quiz.timeLimitMinutes,
            ...(publish ? { published: true } : {}),
        }

        await quizClient.updateQuiz(quiz._id, updates);

        if (publish) {
            router.push(`/Courses/${cid}/Quizzes`);
        } else {
            router.push(`/Courses/${cid}/Quizzes/${qid}`);
        }
    };

    const handleCancel = () => {
        router.push(`/Courses/${cid}/Quizzes`);
    };

    if (!quiz) {
        return <div>Loading quiz...</div>;
    }

    return (
        <div id="wd-quiz-editor">
            <h2>Quiz Editor – {quiz.title || "New Quiz"}</h2>
            <hr />

            <Form>
                {/* TITLE */}
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control 
                        type="text"
                        value={quiz.title}
                        onChange = {(e) => handleChange("title", e.target.value)}
                    />
                </Form.Group>

                {/* DESCRIPTION */}
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                        as="textarea"
                        rows={3}
                        value={quiz.description ?? ""}
                        onChange = {(e) => handleChange("description", e.target.value)}
                    />
                </Form.Group>

                {/* AVAILABLE FROM */}
                <Form.Group className="mb-3">
                    <Form.Label>Available From</Form.Label>
                    <Form.Control 
                        type="date"
                        value={quiz.availableDate?.slice(0, 10) || ""}
                        onChange = {(e) => handleChange("availableDate", e.target.value)}
                    />
                </Form.Group>

                {/* UNTIL */}
                <Form.Group className="mb-3">
                    <Form.Label>Until</Form.Label>
                    <Form.Control 
                        type="date"
                        value={quiz.untilDate?.slice(0, 10) || ""}
                        onChange = {(e) => handleChange("untilDate", e.target.value)}
                    />
                </Form.Group>

                {/* DUE DATE */}
                <Form.Group className="mb-3">
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control 
                        type="date"
                        value={quiz.dueDate?.slice(0, 10) || ""}
                        onChange = {(e) => handleChange("dueDate", e.target.value)}
                    />
                </Form.Group>

                {/* SHUFFLE ANSWERS */}
                <Form.Group className="mb-3">
                    <Form.Check 
                        type="checkbox"
                        label="Shuffle answers"
                        checked={quiz.shuffleAnswers ?? false}
                        onChange = {(e) => handleChange("shuffleAnswers", e.target.checked)}
                    />
                </Form.Group>

                {/* ENABLE TIME LIMIT */}
                <Form.Group className="mb-3">
                    <Form.Check 
                        type="checkbox"
                        label="Time Limit?"
                        checked={quiz.timeLimitEnabled ?? false}
                        onChange = {(e) => handleChange("timeLimitEnabled", e.target.checked)}
                    />
                </Form.Group>

                {/* SET TIME LIMIT */}
                {quiz.timeLimitEnabled && (
                    <Form.Group className="mb-3">
                        <Form.Label>Time Limit (Minutes)</Form.Label>
                        <Form.Control 
                            type="number"
                            value={quiz.timeLimitMinutes ?? 20}
                            onChange = {(e) => handleChange("timeLimitMinutes", Number(e.target.value))}
                        />
                    </Form.Group>
                )}
            </Form>
            <div className="mt-3 d-flex gap-2">
                <Button variant="primary" onClick = {() => handleSave(false)}>
                    Save
                </Button>
                <Button variant="success" onClick = {() => handleSave(true)}>
                    Save & Publish
                </Button>
                <Button variant="secondary" onClick= {handleCancel}>
                    Cancel
                </Button>
            </div>
        </div>
    )
}