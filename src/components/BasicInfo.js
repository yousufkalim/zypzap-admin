import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Form, FormGroup, Row, Col } from 'reactstrap';
import { Store, UpdateStore } from 'StoreContext';
import './BasicInfo.css';

const BasicInfo = () => {
  const { admin } = Store();
  const updateStore = UpdateStore();
  const [formData, setFormData] = useState({
    username: admin?.adminname ? admin.username : '',
    email: admin?.email ? admin.email[0] : '',
    password: admin?.password ? admin.password : '',
  });
  const { username, email, password } = formData;
  useEffect(() => {
    setFormData({
      username: admin?.adminname ? admin.username : '',
      email: admin?.email ? admin.email[0] : '',
      password: admin?.password ? admin.password : '',
    });
  }, [admin]);

  const chnageEvent = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const SubmitEvent = async (e) => {
    e.preventDefault();

    if (username == '') {
      return toast.error('Enter your user name');
    }
    if (email == '') {
      return toast.error('Enter your email');
    }
    if (password == '') {
      return toast.error('Enter your Phone Number');
    }
    if (!username) {
      return toast.error('User ID is required');
    }

    // let res = await api('post', `/admins/basicInfo/${admin?._id}`, formData);
    // if (res) {
    //   updateStore({ admin: res.data.admin });
    //   toast.success('Modifier le profil avec succès');
    //   setFormData({
    //     username: '',
    //     email: '',
    //     password: '',
    //   });
    // }
  };
  return (
    <>
      <div className="text-center" style={{ marginTop: '10%' }}>
        <h1 className="basicH3">Edit Profile</h1>
        <div className="basic_info">
          <Form className="pl-lg-4">
            <Row>
              <Col lg="12">
                <FormGroup style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <label className="form-control-label" htmlFor="input-name">
                    Username:{' '}
                  </label>

                  <input
                    type="text"
                    className="form-control-alternative"
                    placeholder=" Name"
                    onChange={chnageEvent}
                    value={username}
                    name="username"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg="12">
                <FormGroup style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <label className="form-control-label" htmlFor="input-email">
                    Email:{' '}
                  </label>{' '}
                  <input
                    type="email"
                    className="form-control-alternative"
                    placeholder="Email address"
                    onChange={chnageEvent}
                    name="email"
                    value={email}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg="12">
                <FormGroup style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <label className="form-control-label" htmlFor="input-password">
                    Password:{' '}
                  </label>
                  <input
                    type="password"
                    className="form-control-alternative"
                    placeholder="Password"
                    onChange={chnageEvent}
                    name="password"
                    value={password}
                  />
                </FormGroup>
              </Col>
            </Row>

            <button
              type="button"
              className="btn active btn-custom"
              data-toggle="button"
              aria-pressed="true"
              onClick={SubmitEvent}
            >
              <i class="fa fa-check" aria-hidden="true"></i> &nbsp; Save Changes
            </button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default BasicInfo;

// import { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import { api } from 'api';

// import {
//   Modal,
//   ModalBody,
//   ModalHeader,
//   ModalFooter,
//   Button,
//   FormGroup,
//   Form,
//   Input,
//   Row,
//   Col,
// } from 'reactstrap';
// // core components

// const BasicInfo = () => {
//   const { user } = Store();
//   const [admin, setAdmin] = useState({
//     username: '',
//     // password: '',
//     email: '',
//   });
//   const updateStore = UpdateStore();

//   useEffect(() => {
//     setAdmin({
//       username: user.username || '',
//       //   password: user.password || '',
//       email: user.email || '',
//     });
//   }, []);

//   const handleInputChange = (e) => {
//     setAdmin({ ...admin, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     let method = 'put';
//     let uri = 'admins';

//     const formData = new FormData();

//     formData.append('username', admin.username);
//     formData.append('email', admin.email);

//     if (admin.password) {
//       formData.append('password', admin.password);
//     }

//     // uri = uri + `/${user._id}`;

//     // api(method, uri, formData).then((res) => {
//     //   // eslint-disable-next-line eqeqeq
//     //   let admin = res.data.admin;
//     //   if (res.status == 200) {
//     //     toast.success('Saved Successfully');

//     //     updateStore({
//     //       user: admin,
//     //     });

//     //     localStorage.setItem(
//     //       'user',
//     //       JSON.stringify({
//     //         ...admin,
//     //       })
//     //     );
//     //     handleModal();
//     //   } else {
//     //     toast.error('Save Error', res);
//     //   }
//     // });
//   };

//   return (
//     <>
//       <Modal size="xl" centered>
//         <ModalHeader charCode="X"></ModalHeader>
//         <ModalBody>
//           <Row>
//             <Col>
//               <Form>
//                 <h6 className="heading-small text-muted mb-4">Admin Profile</h6>

//                 <div className="pl-lg-4">
//                   <Row>
//                     <Col lg="6">
//                       <FormGroup>
//                         <label className="form-control-label" htmlFor="input-fname">
//                           <span style={{ color: 'red' }}> {admin.username ? '' : '*'} </span>
//                           {''} First Name
//                         </label>
//                         <Input
//                           className="form-control-alternative"
//                           id="input-name"
//                           required={true}
//                           placeholder="John"
//                           type="text"
//                           value={admin.username}
//                           name="username"
//                           onChange={handleInputChange}
//                         />
//                       </FormGroup>
//                     </Col>

//                     <Col lg="6">
//                       <FormGroup>
//                         <label className="form-control-label" htmlFor="input-email">
//                           <span style={{ color: 'red' }}>
//                             {admin.email ? '' : '*'} {''}
//                           </span>
//                           Email Address
//                         </label>
//                         <Input
//                           type="email"
//                           name="email"
//                           className="form-control-alternative"
//                           id="input-email"
//                           placeholder="johndoe@example.com"
//                           value={admin.email}
//                           onChange={handleInputChange}
//                         />
//                       </FormGroup>
//                     </Col>
//                     <Col lg="6">
//                       <FormGroup>
//                         <label className="form-control-label" htmlFor="input-password">
//                           Password
//                         </label>
//                         <Input
//                           className="form-control-alternative"
//                           id="input-password"
//                           placeholder="Password"
//                           type="password"
//                           value={admin.password}
//                           name="password"
//                           onChange={handleInputChange}
//                         />
//                       </FormGroup>
//                     </Col>
//                   </Row>
//                 </div>
//               </Form>
//             </Col>
//           </Row>
//         </ModalBody>
//         <ModalFooter>
//           <Button color="primary" onClick={handleSubmit}>
//             Save
//           </Button>{' '}
//           <Button>Cancel</Button>
//         </ModalFooter>
//       </Modal>
//     </>
//   );
// };

// export default BasicInfo;
