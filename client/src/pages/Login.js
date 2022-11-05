import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log(formState);
      const { data } = await login({
        variables: { ...formState },
      });
      console.log(data);
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-md-6">
        <div className="card">
          <h4 className="card-header">Login</h4>
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  className="form-input"
                  name="email"
                  id="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  className="form-input"
                  placeholder="******"
                  name="password"
                  id="password"
                  value={formState.password}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button variant="secondary" type="submit">
                Submit
              </Button>
            </form>

            {error && <div>Login failed</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
