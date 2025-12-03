"use client";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import InputGroupText from "react-bootstrap/InputGroupText";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useRouter, useParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export default function AssignmentControls() {
  const router = useRouter();
  const { cid } = useParams() as { cid: string };

  const handleAddAssignmentClick = () => {
    const newAid = uuidv4();
    router.push(`/Courses/${cid}/Assignments/${newAid}`);
  };

  return (
    <div className="d-flex align-items-center justify-content-between mb-3">
      <InputGroup size="lg" className="me-3" style={{ maxWidth: 480 }}>
        <InputGroupText className="bg-white border-end-0">
          <FaMagnifyingGlass className="opacity-50" />
        </InputGroupText>
        <Form.Control
          placeholder="Search..."
          aria-label="Search"
          className="border-start-0"
        />
      </InputGroup>

      <div className="d-flex gap-2">
        <Button variant="light" className="border">
          + Group
        </Button>
        <Button variant="danger" onClick={handleAddAssignmentClick}>
          + Assignment
        </Button>
      </div>
    </div>
  );
}
