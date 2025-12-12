"use client"
import { useParams, useRouter } from "next/navigation";
import CourseNavigation from "../Navigation"
import { useState, useEffect } from "react";
import * as quizClient from "./client";
import { Button } from "react-bootstrap";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaCircle } from "react-icons/fa6";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Dropdown } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";


export type Quiz = {
    _id: string;
    courseId: string;
    title: string;
    description: string;
    published: boolean;
    availableDate?: string;
    untilDate?: string;
    dueDate?: string;
    points: number;
};

type QuizAttempt = {
  score: number;
  maxScore: number;
  attemptNumber: number;
};


export default function Quizzes() {
    const { cid } = useParams() as { cid: string };
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [quizInfo, setQuizInfo] = useState<Record<string, { totalPoints: number; questionCount: number }>>({});
    const [attemptsMap, setAttemptsMap] = useState<Record<string, QuizAttempt | null>>({});
    const router = useRouter();
    const currentUser = useSelector((state: RootState) => state.accountReducer.currentUser) as any;
    const isFaculty = currentUser?.role === "FACULTY";
    const isStudent = currentUser?.role === "STUDENT";

    const loadQuizzes = async () => {
        const data = await quizClient.findQuizzesForCourse(cid);
        setQuizzes(data);
        await loadQuizInfo(data);
        await loadAttempts(data);
    }

    const loadQuizInfo = async (quizList: Quiz[]) => {
        const info: Record<string, { totalPoints: number; questionCount: number }> = {};
      
        for (const quiz of quizList) {
            const questions = await quizClient.findQuestionsForQuiz(quiz._id);
      
            let totalPoints = 0;
            for (const question of questions) {
                if (typeof question.points === "number") {
                    totalPoints += question.points;
                }
            }
      
            info[quiz._id] = {
                totalPoints,
                questionCount: questions.length,
            };
        }
      
        setQuizInfo(info);
    };

    const loadAttempts = async (quizList: Quiz[]) => {
        if (!isStudent || quizList.length === 0) return;

        const map: Record<string, QuizAttempt | null> = {};

        for (const quiz of quizList) {
            try {
                const attempt = await quizClient.findMyLastQuizAttempt(quiz._id);
                map[quiz._id] = attempt || null;
            } catch (e) {
                map[quiz._id] = null;
            }
        }
        
        setAttemptsMap(map);
    }

    const isAvailable = (quiz : Quiz) => {
        const today = new Date();

        const open = quiz.availableDate ? new Date(quiz.availableDate) : null;
        const close = quiz.untilDate ? new Date(quiz.untilDate) : null;

        if (open && today < open) {
            return `Not open until ${open.toLocaleDateString()}`;
        }
        
        if (close && today > close) {
            return "Closed";
        }
    
        if (open || close) {
            return "Open";
        }
    
        return "";
    }

    const handleAddQuizzes = async () => {
        if (!isFaculty) return;
        const created = await quizClient.createQuizForCourse(cid);
        setQuizzes([...quizzes, created]);
        router.push(`/Courses/${cid}/Quizzes/${created._id}/edit`)
    }

    const handleDeleteQuiz = async (quizId: string) => {
        if (!isFaculty) return;
        await quizClient.deleteQuiz(quizId);
        setQuizzes(quizzes.filter((q) => q._id !== quizId))
    }

    const togglePublish = async (quiz : Quiz) => {
        if (!isFaculty) return;
        const updated = await quizClient.updateQuiz(quiz._id,  { published : !quiz.published})
        setQuizzes(quizzes.map((q) => (q._id === quiz._id ? updated : q)));
    }

    useEffect(() => {
        loadQuizzes();
    }, [cid]);

    const visibleQuizzes = isFaculty ? quizzes
        : quizzes.filter((q) => q.published);
    
    return (
        <div className="row g-3">
            <aside className="d-none d-md-block col-md-3 col-lg-2">
                <div className="position-sticky" style={{ top: 16 }}>
                    <CourseNavigation />
                </div>
            </aside>
            <main className="col-12 col-md-9 col-lg-10">
                <div id="Quizzes">
                    <h2> 
                    Quizzes 
                    {isFaculty && (
                        <Button className="float-end" variant="danger" onClick={handleAddQuizzes}>
                            + Quiz
                        </Button> 
                    )}
                    </h2>
                    <hr />
                    {visibleQuizzes.length === 0 ? (
                        <div>
                        {isFaculty
                            ? "No quizzes yet. Click + Quiz to add one."
                            : "No quizzes are available."}
                        </div>
                    ) : (
                    <ul className="list-group">
                        {visibleQuizzes.map((q) => {
                            const icon = q.published ? <GreenCheckmark /> : "🚫"
                            return (
                                <li 
                                    key={q._id} 
                                    className="list-group-item d-flex justify-content-between align-items-center"
                                >
                                    <div>
                                        <Link href={`/Courses/${cid}/Quizzes/${q._id}`}>
                                            {q.title || "New Quiz"}
                                        </Link>
                                        {isFaculty ? (
                                            <Button
                                                type="button"
                                                className="btn btn-link p-0 ms-2 align-middle"
                                                onClick={() => togglePublish(q)}
                                            >
                                                {icon}
                                            </Button>
                                        ) : (
                                            <span className="ms-2 align-middle">
                                                {icon}
                                            </span>
                                        )}
                                        <div className="small text-muted mt-1">
                                            <div>{isAvailable(q)}</div>
                                            <div>
                                                Due: {q.dueDate
                                                        ? new Date(q.dueDate).toLocaleDateString() : "-"}
                                            </div>
                                            <div>
                                                Points: {quizInfo[q._id]?.totalPoints ?? q.points ?? 0} <br />
                                                Questions: {quizInfo[q._id]?.questionCount ?? 0} <br />
                                                {isStudent && (
                                                    <div>
                                                        Score: {attemptsMap[q._id]
                                                        ? `${attemptsMap[q._id]!.score} / ${attemptsMap[q._id]!.maxScore}`
                                                        : "-"}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {isFaculty && (
                                        <Dropdown align="end">
                                            <Dropdown.Toggle
                                                variant="secondary"
                                                size="sm"
                                                id={`quiz-${q._id}-menu`}
                                            >
                                                <BsThreeDotsVertical />
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item
                                                    onClick={() => router.push(`/Courses/${cid}/Quizzes/${q._id}/edit`)}
                                                >
                                                    Edit
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    onClick={() => togglePublish(q)}
                                                >
                                                    {q.published ? "Unpublish" : "Publish"}
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    onClick={() => handleDeleteQuiz(q._id)}
                                                >
                                                    Delete
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    )}
                                </li>
                            );
                        })} 
                    </ul>
                    )}
                </div>
            </main>
        </div>
    );
}