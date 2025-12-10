"use client"
import { useParams, useRouter } from "next/navigation";
import CourseNavigation from "../Navigation"
import { useState, useEffect } from "react";
import * as quizClient from "./client";
import { Button } from "react-bootstrap";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaCircle } from "react-icons/fa6";
import Link from "next/link";

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

export default function Quizzes() {
    const { cid } = useParams() as { cid: string };
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const router = useRouter();

    const loadQuizzes = async () => {
        const data = await quizClient.findQuizzesForCourse(cid);
        setQuizzes(data);
    }

    const handleAddQuizzes = async () => {
        const created = await quizClient.createQuizForCourse(cid);
        setQuizzes([...quizzes, created]);
    }

    const handleDeleteQuiz = async (quizId: string) => {
        const data = await quizClient.deleteQuiz(quizId);
        setQuizzes(quizzes.filter((q) => q._id !== quizId))
    }

    const togglePublish = async (quiz : Quiz) => {
        const updated = await quizClient.updateQuiz(quiz._id,  { published : !quiz.published})
        setQuizzes(quizzes.map((q) => (q._id === quiz._id ? updated : q)));
    }

    useEffect(() => {
        loadQuizzes();
    }, [cid]);
    
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
                    <Button className="float-end" variant="danger" onClick={handleAddQuizzes}>
                        + Quiz
                    </Button>
                    </h2>
                    <hr />
                    {quizzes.length === 0 ? (
                    <div>No quizzes yet. Click + Quiz to add one.</div>
                    ) : (
                    <ul className="list-group">
                        {quizzes.map((q) => {
                            const icon = q.published ? <GreenCheckmark /> : <FaCircle className="text-white me-1 fs-6" />
                            return (
                                <li 
                                    key={q._id} 
                                    className="list-group-item d-flex justify-content-between align-items-center"
                                >
                                    <div>
                                        <Link href={`/Courses/${cid}/Quizzes/${q._id}`}>
                                            {q.title || "New Quiz"}
                                        </Link>
                                        <span className="ms-2">{icon}</span>
                                    </div>
                                    <div className="btn-group">
                                        <Button 
                                            size="sm" 
                                            variant={q.published ? "secondary" : "success"}
                                            onClick={() => togglePublish(q)}>
                                            {q.published ? "Unpublish" : "Publish"}
                                        </Button>
                                        <Button 
                                            size="sm"
                                            variant="outline-primary"
                                            as={Link as any}
                                            href={`/Courses/${cid}/Quizzes/${q._id}/edit`}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline-danger"
                                            onClick={() => handleDeleteQuiz(q._id)}>
                                            Delete
                                        </Button>
                                    </div>
                                </li>
                            );
                        })} 
                    </ul>
                    )}
                </div>
            </main>
        </div>
    )
}