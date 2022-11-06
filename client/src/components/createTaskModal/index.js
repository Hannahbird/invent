import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { ADD_EVENTTASK } from "../../utils/mutations";
import { QUERY_COMPANY_DEPTS } from "../../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import TimePicker from "react-bootstrap-time-picker";
function CreateTaskModal({ eventId, taskRefetch, showCreate, setShowCreate }) {
  const [startTime, setStartTime] = useState({ time: 0 });
  const [endTime, setEndTime] = useState({ time: 0 });

  const [addEventTask] = useMutation(ADD_EVENTTASK);
  const { loading, data } = useQuery(QUERY_COMPANY_DEPTS);
  const departments = data?.departments || [];
  const onFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());
    const parsedObj = {
      eventId: eventId,
      startTime: formDataObj.startTime / 36,
      endTime: formDataObj.endTime / 36,
      description: formDataObj.description,
      department: formDataObj.department,
    };
    console.log(parsedObj);
    await addEventTask({ variables: parsedObj });
    taskRefetch();
  };
  return (
    <Modal
      show={showCreate}
      onHide={() => {
        setShowCreate(false);
      }}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form onSubmit={onFormSubmit}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create Task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Create Events</h4>
          <Form.Group className="mb-3">
            <Form.Label>Task Description</Form.Label>
            <Form.Control
              name="description"
              type="string"
              placeholder="Event Name"
            />
            <Form.Text className="text-muted">
              A short description of expected duties
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Start Time</Form.Label>
            <TimePicker
              name="startTime"
              start="10:00"
              end="21:00"
              step={30}
              value={startTime}
              onChange={(time) => setStartTime(time)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>End Time</Form.Label>
            <TimePicker
              name="endTime"
              start="10:00"
              end="21:00"
              step={30}
              value={endTime}
              onChange={(time) => setEndTime(time)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Department</Form.Label>
            <Form.Select
              name="department"
              type="string"
              placeholder="Department Needed"
            >
              {departments.map((department) => {
                if (department.deptName === "admin") {
                  return;
                }
                return (
                  <option value={department._id}>{department.deptName}</option>
                );
              })}
            </Form.Select>
            <Form.Text className="text-muted">
              Which department needs to be notified?
            </Form.Text>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type="submit">
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
export default CreateTaskModal;
