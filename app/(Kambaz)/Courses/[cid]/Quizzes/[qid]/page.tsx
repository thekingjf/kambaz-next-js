"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "react-bootstrap";
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
};

export default function QuizDetails() { 
    const { cid, qid } = useParams() as { cid: string; qid: string };
    const router = useRouter();
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [totalPoints, setTotalPoints] = useState<number | null>(null);

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

    const handlePreview = () => {
        router.push(`/Courses/${cid}/Quizzes/${qid}/preview`);
    }

    const loadTotalPoints = async () => {
        const questions = await quizClient.findQuestionsForQuiz(qid);
        const sum = questions.reduce(
            (acc: number, q: any) => acc + (typeof q.points === "number" ? q.points : 0), 0);
        setTotalPoints(sum);
    }

    useEffect(() => {
        loadQuiz();
        loadTotalPoints();
    }, [qid]);

    if (!quiz) {
        return <div>Loading quiz...</div>;
    }

    const publishedButton = quiz.published ? "Published" : "Unpublished";
    const published = quiz.published ? <GreenCheckmark /> : <FaCircle className="text-white me-1 fs-6" />

    return (
        <div id="wd-quiz-details">
            <h2>{quiz.title || "Quiz"}</h2>
            <p className="text-muted"> {published}</p>
            <hr />

            <div className="mb-3">
                <strong>Description</strong>
                <p>{quiz.description || "No description"}</p>
            </div>

            <div className="mb-2">
                <strong>Points:</strong> {totalPoints !== null ? totalPoints : quiz.points ?? 0}
            </div>

            <div className="mb-2">
                <strong>Available From: </strong>
                {quiz.availableDate ? quiz.availableDate.slice(0, 10) : "-"}
            </div>

            <div className="mb-2">
                <strong>Available Until: </strong>
                {quiz.untilDate ? quiz.untilDate.slice(0, 10) : "-"}
            </div>

            <div className="mb-2">
                <strong>Due Date: </strong>
                {quiz.dueDate ? quiz.dueDate.slice(0, 10) : "-"}
            </div>

            <div className="mb-2">
                <strong>Shuffle Answers: </strong>
                {quiz.shuffleAnswers ? "Yes" : "No"}
            </div>

            <div className="mb-2">
                <strong>Time Limit Enabled:</strong>{" "}
                {quiz.timeLimitEnabled ? "Yes" : "No"}
            </div>

            {quiz.timeLimitEnabled && (
                <div className="mb-2">
                <strong>Time Limit (Minutes):</strong>{" "}
                {quiz.timeLimitMinutes ?? 20}
                </div>
            )}

            <hr />

            <div className="d-flex gap-2">
                <Button 
                    variant="dark"
                    onClick={() => router.push(`/Courses/${cid}/Quizzes`)}
                >
                    Back to Quizzes
                </Button>

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
            </div>
        </div>
    );
}