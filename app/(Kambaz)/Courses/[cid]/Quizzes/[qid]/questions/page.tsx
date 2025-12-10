"use client";

import { useParams } from "next/navigation";
import { Button } from "react-bootstrap";
import QuizQuestionsEditor from "../../components/QuizQuestionsEditor";
import { useRouter } from "next/navigation";

export default function QuizQuestionsPage() {
    const { cid, qid } = useParams() as { cid: string; qid: string };
    const router = useRouter();

    return (
        <div id="wd-quiz-questions-page">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Quiz Questions</h2>
                <Button 
                    variant="secondary"
                    onClick = {() => router.push(`/Courses/${cid}/Quizzes/${qid}/edit`)}>
                    Back to Details
                </Button>
            </div>

            <QuizQuestionsEditor quizId={qid} />
        </div>
    )
}
