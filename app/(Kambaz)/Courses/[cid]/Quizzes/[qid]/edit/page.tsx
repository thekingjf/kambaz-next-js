"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import * as quizClient from "../../client";
import QuizQuestionsEditor from "../../components/QuizQuestionsEditor";

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


type Tab = "DETAILS" | "QUESTIONS";

export default function QuizEditor() { 
    const { cid, qid } = useParams() as { cid: string; qid: string };
    const router = useRouter();
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [activeTab, setActiveTab] = useState<Tab>("DETAILS");

    const loadQuiz = async () => {
        const data = await quizClient.findQuizById(qid);
        setQuiz(data);
    }

    useEffect(() => {
        loadQuiz()
    }, [qid]);

    const handleChange = (field : keyof Quiz, value : number | boolean | string | undefined) => {
        if (!quiz) return
        setQuiz({ ...quiz, [field]: value } as Quiz)
    };

    const toDateValue = (value?: string) => {
        if (!value) return "";
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return "";
        const pad = (n: number) => String(n).padStart(2, "0");
        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1);
        const day = pad(date.getDate());
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const fromDateValue = (value: string): string | undefined => {
        if (!value) return undefined;
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return undefined;
        return date.toISOString();
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
            quizType: quiz.quizType,
            assignmentGroup: quiz.assignmentGroup,
            multipleAttempts: quiz.multipleAttempts,
            maxAttempts: quiz.maxAttempts,
            showCorrectAnswers: quiz.showCorrectAnswers,
            showCorrectAnswersAt: quiz.showCorrectAnswersAt,
            accessCode: quiz.accessCode,
            oneQuestionAtATime: quiz.oneQuestionAtATime,
            webcamRequired: quiz.webcamRequired,
            lockQuestionsAfterAnswering: quiz.lockQuestionsAfterAnswering,
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
            <div className="mb-3 border-bottom d-flex gap-2">
                <Button
                    variant={activeTab === "DETAILS" ? "dark" : "secondary"}
                    size="sm"
                    onClick={() => setActiveTab("DETAILS")}
                >
                    Details
                </Button>
                <Button
                    variant={activeTab === "QUESTIONS" ? "dark" : "secondary"}
                    size="sm"
                    onClick={() => setActiveTab("QUESTIONS")}
                >
                    Questions
                </Button>

            </div>

            <hr />
            {activeTab === "DETAILS" && (
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

                    {/* QUIZ TYPE */}
                    <Form.Group className="mb-3">
                        <Form.Label>Quiz Type</Form.Label>
                            <Form.Select 
                                value={quiz.quizType ?? "Graded Quiz"}
                                onChange = {(e) => handleChange("quizType", e.target.value)}
                            >
                                <option>GRADED_QUIZ</option>
                                <option>PRACTICE_QUIZ</option>
                                <option>GRADED_SURVEY</option>
                                <option>UNGRADED_SURVEY</option>
                            </Form.Select>
                    </Form.Group>

                    {/* ASSIGNMENT GROUP */}
                    <Form.Group className="mb-3">
                        <Form.Label>Assignment Group</Form.Label>
                            <Form.Select 
                                value={quiz.assignmentGroup ?? "Quizzes"}
                                onChange = {(e) => handleChange("assignmentGroup", e.target.value)}
                            >
                                <option>Quizzes</option>
                                <option>Exams</option>
                                <option>Assignments</option>
                                <option>Projects</option>
                            </Form.Select>
                    </Form.Group>

                    {/* AVAILABLE FROM */}
                    <Form.Group className="mb-3">
                        <Form.Label>Available From</Form.Label>
                        <Form.Control 
                            type="datetime-local"
                            value={toDateValue(quiz.availableDate)}
                            onChange = {(e) => handleChange("availableDate", fromDateValue(e.target.value))}
                        />
                    </Form.Group>

                    {/* UNTIL */}
                    <Form.Group className="mb-3">
                        <Form.Label>Until</Form.Label>
                        <Form.Control 
                            type="datetime-local"
                            value={toDateValue(quiz.untilDate)}
                            onChange = {(e) => handleChange("untilDate", fromDateValue(e.target.value))}
                        />
                    </Form.Group>

                    {/* DUE DATE */}
                    <Form.Group className="mb-3">
                        <Form.Label>Due Date</Form.Label>
                        <Form.Control 
                            type="datetime-local"
                            value={toDateValue(quiz.dueDate)}
                            onChange = {(e) => handleChange("dueDate", fromDateValue(e.target.value))}
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

                    {/* MULTIPLE ATTEMPTS */}
                    <Form.Group className="mb-3">
                        <Form.Check 
                            type="checkbox"
                            label="Allow Multiple Attempts"
                            checked={quiz.multipleAttempts ?? false}
                            onChange = {(e) => handleChange("multipleAttempts", e.target.checked)}
                        />
                    </Form.Group>   

                    {/* SET ATTEMPT LIMIT*/}
                    {quiz.multipleAttempts && (
                        <Form.Group className="mb-3">
                            <Form.Label>How Many Attempts</Form.Label>
                            <Form.Control 
                                type="number"
                                min={1}
                                value={quiz.maxAttempts ?? 1}
                                onChange = {(e) => handleChange("maxAttempts", Number(e.target.value) || 1)}
                            />
                        </Form.Group>
                    )}

                    {/* SHOW CORRECT ANSWERS */}
                    <Form.Group className="mb-3">
                        <Form.Check 
                            type="checkbox"
                            label="Show correct answers"
                            checked={quiz.showCorrectAnswers ?? false}
                            onChange = {(e) => handleChange("showCorrectAnswers", e.target.checked)}
                        />
                    </Form.Group>   

                    {/* WHEN TO SHOW ANSWERS */}
                    {quiz.showCorrectAnswers && (
                        <Form.Group className="mb-3">
                            <Form.Label>When to Show Answers</Form.Label>
                            <br />
                            <Form.Text>
                                Leave Blank for to show on submission
                            </Form.Text>
                            <Form.Control 
                                type="datetime-local"
                                value={toDateValue(quiz.showCorrectAnswersAt)}
                                onChange = {(e) => handleChange("showCorrectAnswersAt", fromDateValue(e.target.value))}
                            />
                        </Form.Group>
                    )}

                    {/* ACCESS CODE */}
                    <Form.Group className="mb-3">
                        <Form.Label>Access Code: </Form.Label>
                        <Form.Control 
                            type="text"
                            placeholder="Leave blank for no access code"
                            value={quiz.accessCode ?? ""}
                            onChange = {(e) => handleChange("accessCode", e.target.value)}
                        />
                    </Form.Group>

                    {/* ONE QUESTION AT A TIME */}
                    <Form.Group className="mb-3">
                        <Form.Check 
                            type="checkbox"
                            label="One Question at a Time"
                            checked={quiz.oneQuestionAtATime ?? false}
                            onChange = {(e) => handleChange("oneQuestionAtATime", e.target.checked)}
                        />
                    </Form.Group>   

                    {/* WEB REQUIRED */}
                    <Form.Group className="mb-3">
                        <Form.Check 
                            type="checkbox"
                            label="Require Webcam"
                            checked={quiz.webcamRequired ?? false}
                            onChange = {(e) => handleChange("webcamRequired", e.target.checked)}
                        />
                    </Form.Group>

                    {/* LOCK QURESTION */}
                    <Form.Group className="mb-3">
                        <Form.Check 
                            type="checkbox"
                            label="Lock Questions After Answering"
                            checked={quiz.lockQuestionsAfterAnswering ?? false}
                            onChange = {(e) => handleChange("lockQuestionsAfterAnswering", e.target.checked)}
                        />
                    </Form.Group>


                </Form>
            )}

            {activeTab === "QUESTIONS" && (
                <div className="mt-3">
                    <QuizQuestionsEditor quizId={qid} />
                </div>
            )}
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