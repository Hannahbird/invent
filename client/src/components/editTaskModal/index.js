import React, { useState, useEffect } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { DELETE_EVENTTASK, UPDATE_EVENTTASK } from "../../utils/mutations";
import { QUERY_COMPANY_DEPTS } from "../../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import DateTime from "../../utils/dateTime/dateTimeTasks";
function EditTaskModal({ task, taskRefetch, showEdit, setShowEdit }) {
  const [editDate, setEditDate] = useState({
    startTime: task.startTime,
    endTime: task.endTime,
  });
  useEffect(() => {
    setEditDate({ startTime: task.startTime, endTime: task.endTime });
  }, [showEdit]);

  const [delEventTask] = useMutation(DELETE_EVENTTASK);
  const [addEventTask] = useMutation(UPDATE_EVENTTASK);
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
      taskId: task?._id,
    };
    console.log(reqObj);
    await addEventTask({ variables: reqObj });
    taskRefetch();
    setShowEdit(false);
  };

  async function handleDelete() {
    console.log(task._id);
    setShowEdit(false);
    await delEventTask({ variables: { taskId: task._id } });
    taskRefetch();
  }

  return (
    <Modal
      show={showEdit}
      onHide={() => {
        setShowEdit(false);
      }}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form onSubmit={onFormSubmit}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Edit Task</h4>
          <Form.Group className="mb-3">
            <Form.Label>Task Description</Form.Label>
            <Form.Control
              name="description"
              type="string"
              placeholder="Task Description"
              defaultValue={task.description}
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
              stateMgr={setEditDate}
              stateObj={editDate}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Department</Form.Label>
            <Form.Select
              defaultValue={task.department?._id}
              name="department"
              type="string"
              placeholder="Department Needed"
            >
              {departments.map((department) => {
                if (department.deptName === "admin") {
                  return;
                }
                return (
                  <option value={department?._id}>{department.deptName}</option>
                );
              })}
            </Form.Select>
            <Form.Text className="text-muted">
              Which department needs to be notified?
            </Form.Text>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleDelete} variant="danger">
            Delete
          </Button>
          <Button variant="secondary" type="submit">
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
export default EditTaskModal;
