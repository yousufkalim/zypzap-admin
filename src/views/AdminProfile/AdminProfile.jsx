import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
// import api from '../../api';
import { UpdateStore } from 'StoreContext';
import api from '../../api/index';
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from 'reactstrap';
// core components

const AdminProfile = ({ openModal, handleModal, user }) => {
  const [admin, setAdmin] = useState({
    name: '',
    password: '',
    email: '',
  });
  const updateStore = UpdateStore();

  useEffect(() => {
    setAdmin({
      name: user.name || '',
      email: user.email || '',
    });
  }, [user]);

  const handleInputChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let method = 'put';
    let uri = '/admins';

    uri = uri + `/${user._id}`;

    api(method, uri, admin).then((res) => {
      // eslint-disable-next-line eqeqeq
      let admin = res.admin;

      toast.success('Saved Successfully');

      updateStore({
        user: admin,
      });

      localStorage.setItem(
        'admin',
        JSON.stringify({
          ...admin,
        })
      );
      handleModal();
    });
  };

  return (
    <>
      <Modal isOpen={openModal} size="xl" centered>
        <ModalHeader charCode="X" toggle={handleModal}></ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <Form>
                <h6 className="heading-small text-muted mb-4">Admin Profile</h6>

                <div className="pl-lg-4">
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-fname">
                          <span style={{ color: 'red' }}> {admin.name ? '' : '*'} </span>
                          {''} User ID
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-fname"
                          required={true}
                          placeholder="John"
                          type="text"
                          value={admin.name}
                          name="name"
                          onChange={handleInputChange}
                        />
                        {console.log('NAME', admin.name)}
                      </FormGroup>
                    </Col>

                    <Col lg="6">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-email">
                          <span style={{ color: 'red' }}>
                            {admin.email ? '' : '*'} {''}
                          </span>
                          Email Address
                        </label>
                        <Input
                          type="email"
                          name="email"
                          className="form-control-alternative"
                          id="input-email"
                          placeholder="johndoe@example.com"
                          value={admin.email}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-password">
                          Password
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-password"
                          placeholder="Password"
                          type="password"
                          value={admin.password}
                          name="password"
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
              </Form>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            Save
          </Button>{' '}
          <Button onClick={handleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AdminProfile;
