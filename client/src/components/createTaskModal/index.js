import React, { useState, useEffect } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { ADD_EVENTTASK } from "../../utils/mutations";
import { QUERY_COMPANY_DEPTS } from "../../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import DateTime from "../../utils/dateTime/dateTimeTasks";

function CreateTaskModal({
  eventData,
  taskRefetch,
  showCreate,
  setShowCreate,
}) {
  const eventId = eventData._id;
  const [editDate, setEditDate] = useState({
    startTime: eventData.eventStartDate,
    endTime: eventData.eventEndDate,
  });
  // loads in new start time whenever a new task is created/selected
  useEffect(() => {
    setEditDate({
      startTime: eventData.eventStartDate,
      endTime: eventData.eventEndDate,
    });
  }, [showCreate]);
  const [addEventTask] = useMutation(ADD_EVENTTASK);
  const { loading, data } = useQuery(QUERY_COMPANY_DEPTS);
  const departments = data?.departments || [];
  const onFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());
    formData.startTime = editDate.startTime;
    formData.endTime = editDate.endTime;
    const reqObj = {
      ...formDataObj,
      startTime: editDate.startTime,
      endTime: editDate.endTime,
      eventId: eventId,
    };
    console.log(reqObj);
    await addEventTask({ variables: reqObj });
    taskRefetch();
    setShowCreate(false);
  };

  const handleChange = (Task) => {
    const { name, value } = Task.target;

    setEditDate({
      ...editDate,
      [name]: value,
    });
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
          <h4>Create a new task</h4>
          <Form.Group className="mb-3">
            <Form.Label>Task Description</Form.Label>
            <Form.Control
              name="description"
              type="string"
              placeholder="Task Description"
              required
            />
            <Form.Text className="text-muted">
              A short description of expected duties
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDateStart">
            <Form.Label></Form.Label>
            <DateTime
              className="form-control"
              name="eventDate"
              type="string"
              startDate={editDate.startTime}
              endDate={editDate.endTime}
              onChange={() => {
                console.log("changing");
                handleChange();
              }}
              stateMgr={setEditDate}
              stateObj={editDate}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Department</Form.Label>
            <Form.Select
              name="department"
              type="string"
              required
              placeholder="Department Needed"
            >
              {departments.map((department) => {
                if (department.deptName.toLowerCase() === "admin") {
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
