// import React, { useState } from 'react';
// import { useMutation } from '@apollo/client';
// import { ADD_USER } from '../utils/mutations';
import { useForm } from "react-hook-form";
import React from "react";

// import Button from 'react-bootstrap/Button';
// import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';
// import Row from 'react-bootstrap/Row';

// import LoggedOutHeader from '../components/LoggedOutHeader';

// import Auth from '../utils/auth';

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const handleRegistration = (data) => console.log(data);
  const handleError = (errors) => {};

  const registerOptions = {
    username: { required: "Username is required" },
    email: { required: "Email is required" },
    companyTitle: { required: "Company name is required" },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters"
      }
    }
  };
  return (
    <form onSubmit={handleSubmit(handleRegistration, handleError)}>
      <div>
        <label>Name</label>
        <input name="name" type="text" {...register('name', registerOptions.name) }/>
        <small className="text-danger">
          {errors?.name && errors.name.message}
        </small>
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          {...register('email', registerOptions.email)}
        />
        <small className="text-danger">
          {errors?.email && errors.email.message}
        </small>
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          {...register('password', registerOptions.password)}
        />
        <small className="text-danger">
          {errors?.password && errors.password.message}
        </small>
      </div>
      <button>Submit</button>
    </form>
  );
};
export default RegisterForm;

// const Signup = () => {
  // const [formState, setFormState] = useState({
  //   username: '',
  //   email: '',
  //   companyTitle: '',
  //   signUpLink: '',
  //   newCompany: false,
  //   password: '',
  // });
//   const [addUser, { error }] = useMutation(ADD_USER);

//   // update state based on form input changes
//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     setFormState({
//       ...formState,
//       [name]: value,
//     });
//   };

  // submit form
  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();

  //   if (formState.companyTitle) {
  //     formState.newCompany = true;
  //   }

    // try {
    //   const { data } = await ADD_USER({
    //     variables: { ...formState },
    //   });

    //   Auth.login(data.addUser.token);
    // } catch (e) {
    //   console.error(e);
    // }
  // };

//   return (
//     <>
//       <LoggedOutHeader />
//       <main className="container flex-row justify-center mb-4">
//         <div className="col-12 col-md-6">
//           <div className="card">
//             <h4 className="card-header">Sign Up</h4>
//             <div className="card-body">
//               <form onSubmit={handleFormSubmit}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>User Name</Form.Label>
//                   <Form.Control
//                     name="username"
//                     type="username"
//                     id="username"
//                     value={formState.username}
//                     onChange={handleChange}
//                   />
//                   <Form.Text className="text-muted">
//                     Enter your user name.
//                   </Form.Text>
//                 </Form.Group>
//                 <Form.Group className="mb-3" /*controlId="formBasicEmail"*/>
//                   <Form.Label>Email address</Form.Label>
//                   <Form.Control
//                     type="email"
//                     placeholder="Enter email"
//                     className="form-input"
//                     name="email"
//                     id="email"
//                     value={formState.email}
//                     onChange={handleChange}
//                   />
//                   <Form.Text className="text-muted">
//                     We'll never share your email with anyone else.
//                   </Form.Text>
//                 </Form.Group>

//                 <Row className="mb-3">
//                   <Form.Group as={Col}>
//                     <Form.Label>New Company</Form.Label>
//                     <Form.Control
//                       placeholder="Your Company"
//                       name="companyTitle"
//                       type="companyTitle"
//                       id="companyTitle"
//                       value={formState.companyTitle}
//                       onChange={handleChange}
//                     />
//                   </Form.Group>
//                   OR
//                   <Form.Group as={Col}>
//                     <Form.Label>Sign Up Code</Form.Label>
//                     <Form.Control
//                       placeholder="Sign Up Link"
//                       name="signUpLink"
//                       type="signUpLink"
//                       id="signUpLink"
//                       value={formState.signUpLink}
//                       onChange={handleChange}
//                     />
//                   </Form.Group>
//                 </Row>

//                 <Form.Group className="mb-3" /*controlId="formBasicPassword"*/>
//                   <Form.Label>Password</Form.Label>
//                   <Form.Control
//                     type="password"
//                     className="form-input"
//                     placeholder="******"
//                     name="password"
//                     id="password"
//                     value={formState.password}
//                     onChange={handleChange}
//                   />
//                 </Form.Group>
//                 <Button variant="secondary" type="submit">
//                   Submit
//                 </Button>
//               </form>

//               {error && <div>Signup failed</div>}
//             </div>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// };

// export default Signup;
