"use client";

import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import * as quizClient from "../client";
import { v4 as uuidv4 } from "uuid";

export type QuestionType = "MULTIPLE_CHOICE" | "TRUE_FALSE" | "FILL_IN_BLANK";

export type Choice = {
  _id: string;
  text: string;
  isCorrect: boolean;
};

export type Question = {
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

type QuestionItemProps = {
  question: Question;
  onUpdated: (question: Question) => void;
  onDeleted: (questionId: string) => void;
};

export default function QuestionItem({ question, onUpdated, onDeleted, }: QuestionItemProps) {
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState<Question>(question);

    useEffect(() => {
        if (!editing) {
          setDraft(question);
        }
      }, [question, editing]);

    const handleFieldChange = (field: keyof Question, value :any) => {
        setDraft((prev) => ({ ...prev, [field]: value }));
    };

    const resetDraft = () => {
        setDraft(question);
        setEditing(false);
    };

    const handleTypeChange = (newType: QuestionType) => {
        setDraft((prev) => {
            if (newType === "MULTIPLE_CHOICE") {
                const choices = 
                    prev.choices && prev.choices.length > 0
                    ? prev.choices
                    : [
                        { _id: uuidv4(), text: "Option 1", isCorrect: true },
                        { _id: uuidv4(), text: "Option 2", isCorrect: false },
                      ];
                return {
                    ...prev,
                    type: newType,
                    choices,
                    correctBoolean: undefined,
                    correctAnswer: [],
                };
            }

            if (newType === "TRUE_FALSE") {
                return {
                    ...prev,
                    type: newType,
                    correctBoolean:
                      typeof prev.correctBoolean === "boolean"
                        ? prev.correctBoolean
                        : true,
                    choices: [],
                    correctAnswer: [],
                };
            }

            return {
                ...prev,
                type: newType,
                correctAnswer:
                prev.correctAnswer && prev.correctAnswer.length > 0
                    ? prev.correctAnswer
                    : [""],
                choices: [],
                correctBoolean: undefined,
            };
        });
    };

    const handleChoiceTextChange = (choiceId : string, text : string) => {
        setDraft((prev) => ({
            ...prev,
            choices: (prev.choices || []).map((c) =>
              c._id === choiceId ? { ...c, text } : c
            ),
        }));
    };

    const handleChoiceCorrectChange = (choiceId : string) => {
        setDraft((prev) => ({
            ...prev,
            choices: (prev.choices || []).map((c) => ({
              ...c,
              isCorrect: c._id === choiceId,
            })),
        }));
    };

    const handleAddChoice = () => {
        setDraft((prev) => ({
            ...prev,
            choices: [
              ...(prev.choices || []),
              {
                _id: uuidv4(),
                text: `Option ${prev.choices.length + 1}`,
                isCorrect: false,
              },
            ],
        }));
    };

    const handleRemoveChoice = (choiceId : string) => {
        setDraft((prev) => ({
            ...prev,
            choices: (prev.choices || []).filter((c) => c._id !== choiceId),
        }));
    }

    const handleCorrectBooleanChange = (value: boolean) => {
        setDraft((prev) => ({
          ...prev,
          correctBoolean: value,
        }));
    };

    const handleFillAnswerChange = (index : number, value : string) => {
        setDraft((prev) => {
            const arr = [...(prev.correctAnswer || [])];
            arr[index] = value;
            return { ...prev, correctAnswer: arr };
        });
    };

    const handleAddFillAnswer = () => {
        setDraft((prev) => ({
            ...prev,
            correctAnswer: [...(prev.correctAnswer || []), ""],
        }));
    };

    const handleRemoveFillAnswer = (index : number) => {
        setDraft((prev) => {
            const arr = [...(prev.correctAnswer || [])];
            arr.splice(index, 1);
            return { ...prev, correctAnswer: arr };
        });
    };

    const handleSave = async () => {
        const updated = await quizClient.updateQuestion(draft._id, draft);
        onUpdated(updated);
        setEditing(false);
    };

    const handleDelete = async () => {
        await quizClient.deleteQuestion(question._id);
        onDeleted(question._id);
    };

    const showSpecificQuestionType = () => {
        if (draft.type === "MULTIPLE_CHOICE") {
            return (
                <div className="mt-3">
                    <Form.Label>Choices</Form.Label>
                    {draft.choices?.map((choice) => (
                        <div key={choice._id} className="d-flex align-items-center gap-2 mb-2">
                            <Form.Check 
                                type="radio"
                                name={`correct-${draft._id}`}
                                checked={choice.isCorrect}
                                onChange={(e) => 
                                    handleChoiceCorrectChange(choice._id)
                                }
                            />
                            <Form.Control
                                value={choice.text}
                                onChange={(e) =>
                                    handleChoiceTextChange(choice._id, e.target.value)
                                }
                            />
                            {draft.choices.length > 1 && (
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleRemoveChoice(choice._id)}
                                >
                                    Remove
                                </Button>
                            )}
                        </div>
                    ))}
                    <Button
                        variant="secondary"
                        size="sm"
                        className="mt-2"
                        onClick={handleAddChoice}
                    >
                        + Choice
                    </Button>
                </div>
            );
        }

        if (draft.type === "TRUE_FALSE") {
            return (
                <div className="mt-3">
                    <Form.Label>Correct Answer</Form.Label>
                    <div className="d-flex gap-3">
                        <Form.Check
                            type="radio"
                            label="True"
                            name={`tf-${draft._id}`}
                            checked={draft.correctBoolean === true}
                            onChange={() => handleCorrectBooleanChange(true)}
                        />
                        <Form.Check
                            type="radio"
                            label="False"
                            name={`tf-${draft._id}`}
                            checked={draft.correctBoolean === false}
                            onChange={() => handleCorrectBooleanChange(false)}
                        />
                    </div>
                </div>
            );
        }

        return (
            <div className="mt-3">
                <Form.Label>Acceptable Answers</Form.Label>
                {(draft.correctAnswer || []).map((ans, index) => (
                    <div key={index} className="d-flex align-items-center gap-2 mb-2"> 
                        <Form.Control
                            value={ans}
                            onChange={(e) => handleFillAnswerChange(index, e.target.value)   
                        }/>
                        {(draft.correctAnswer || []).length > 1 && (
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleRemoveFillAnswer(index)}
                            >
                                - Remove
                            </Button>
                        )}
                    </div>
                ))}
                <Button
                    variant="secondary"
                    size = "sm"
                    className="mt-2"
                    onClick={handleAddFillAnswer}
                >
                    + Answer
                </Button>
            </div>
        );
    };

    const typeLabel = question.type === "MULTIPLE_CHOICE"
        ? "Multiple Choice" : question.type === "TRUE_FALSE"
        ? "True / False" : "Fill in the Blank";

    if (!editing) {
        return (
            <Card className="mb-3">
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-start">
                        <div>
                            <Card.Title className="mb-1">
                                {question.title || "Untitled Question"}
                            </Card.Title>
                            <Card.Subtitle className="text-muted mb-2">
                                {typeLabel} : {question.points ?? 0} pts
                            </Card.Subtitle>
                            <div className="text-muted small">
                                {question.questionText?.slice(0, 120) ||
                                 "No question text"}
                                {question.questionText &&
                                    question.questionText.length > 120 &&
                                "..."}
                            </div>
                        </div>
                        <div className="d-flex flex-column gap-2 ms-2">
                            <Button
                                variant="primary"
                                size="sm"
                                onClick = {() => {
                                    setDraft(question);
                                    setEditing(true);
                                }}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="danger"
                                size="sm"
                                onClick = {handleDelete}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        );
    }

    return (
        <Card className="mb-3 border-primary">
            <Card.Body>
                <Form>
                    <div className="d-flex justify-content-between gap-3">
                        <div className="flex-grow-1">
                            <Form.Group className="mb-2">
                                <Form.Label>Question Title</Form.Label>
                                <Form.Control
                                    value={draft.title}
                                    onChange={(e) =>
                                        handleFieldChange("title", e.target.value)
                                    }
                                    placeholder="Question title"
                                />
                            </Form.Group>

                            <Form.Group className="mb-2">
                                <Form.Label>Question Text</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={draft.questionText}
                                    onChange={(e) => 
                                        handleFieldChange("questionText", e.target.value)
                                    }
                                    placeholder="Text Box"
                                />
                            </Form.Group>
                        </div>
                        <div style={{ minWidth:180}}>
                            <Form.Group className="mb-2">
                                <Form.Label>Points</Form.Label>
                                <Form.Control
                                    type="number"
                                    min={0}
                                    value={draft.points ?? 0}
                                    onChange={(e) => 
                                        handleFieldChange("points", Number(e.target.value) || 0)
                                    }
                                />
                            </Form.Group>
                            
                            <Form.Group>
                                <Form.Label>Type</Form.Label>
                                <Form.Select
                                    value={draft.type}
                                    onChange={(e) => handleTypeChange( e.target.value as QuestionType)}    
                                >
                                    <option value="MULTIPLE_CHOICE">
                                        Multiple Choice
                                    </option>
                                    <option value="TRUE_FALSE">
                                        True / False
                                    </option>
                                    <option value="FILL_IN_BLANK">
                                        Fill in the Blank
                                    </option>
                                </Form.Select>
                            </Form.Group>
                        </div>
                    </div>

                    {showSpecificQuestionType()}

                    <div className="d-flex justify-content-end gap-2 mt-3">
                        <Button variant="secondary" onClick={resetDraft}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleSave}>
                            Save Question
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
}