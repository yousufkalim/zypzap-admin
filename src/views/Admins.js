/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// reactstrap components
import { useState, useEffect } from 'react';
import api from 'api';
import { Store, UpdateStore } from 'StoreContext';

import ExportExecl from 'views/exportfiles/ExportExecl.js';
import {
  Card,
  CardHeader,
  Table,
  Button,
  Container,
  Row,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  UncontrolledDropdown,
} from 'reactstrap';
// core components
import Header from 'components/Headers/Header.js';
import SearchBar from '../components/Searchbar';
import { toast } from 'react-toastify';

const Admins = () => {
  let [page] = useState(window.location.pathname.split('/').pop());
  let [filter, setFilter] = useState('all');
  const { admins } = Store();
  const { user } = Store();
  const updateStore = UpdateStore();
  let [sortedData, setSortedData] = useState('');

  useEffect(() => {
    getAdmins();
  }, []);

  const getAdmins = async () => {
    const data = await api('get', '/admins');
    if (data) {
      updateStore({
        admins: data,
      });
    }
  };

  const myHeader = ['Email', 'Type', 'SUBSCRIBED At'];

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <div className="d-flex justify-content-between ">
                  <h3 className="mb-0" style={{ textTransform: 'capitalize' }}>
                    Admins
                  </h3>

                  <SearchBar />

                  <UncontrolledDropdown>
                    <div style={{ display: 'flex' }}>
                      <ExportExecl
                        Users={admins
                          .sort(function (a, b) {
                            return new Date(b.createdAt) - new Date(a.createdAt);
                          })
                          ?.slice(0, 20)}
                        myHeader={myHeader}
                      />
                      <DropdownToggle
                        color="primary"
                        name
                        href="#pablo"
                        role="button"
                        caret
                        size="md"
                        style={{
                          textTransform: 'capitalize',
                        }}
                      >
                        {filter === 'all' ? 'Sort By' : filter + 's'}
                      </DropdownToggle>
                    </div>
                    <DropdownMenu>
                      <DropdownItem name="tester" onClick={() => setSortedData('byAlphabet')}>
                        A-Z
                      </DropdownItem>
                      <DropdownItem
                        name="admins"
                        style={{ textTransform: 'capitalize' }}
                        onClick={() => setSortedData('byDate')}
                      >
                        Date created
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Email</th>
                    <th scope="col">Status</th>
                    <th scope="col">Created At</th>

                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {admins
                    ? admins
                        .filter(function (a) {
                          return a.role == 'admin';
                        })
                        .sort((a, b) => {
                          if (sortedData === 'byAlphabet') {
                            return a.name.localeCompare(b.name);
                          } else if (sortedData === 'byDate') {
                            return new Date(b.createdAt) - new Date(a.createdAt);
                          }
                        })
                        ?.map((admin) => {
                          return (
                            <tr>
                              <td>{admin.name}</td>
                              <td>{admin.email}</td>
                              {/* <td>{admin.status}</td> */}
                              <td>Active</td>
                              <td>{new Date(admin.createdAt).toDateString()}</td>

                              {/* <td>
                                <button
                                  type="button"
                                  className="btn active btn-default"
                                  data-toggle="button"
                                  aria-pressed="true"
                                >
                                  <i class="fa fa-ban fa-warning" aria-hidden="true">
                                    {'   '}
                                  </i>
                                  &nbsp; Suspend
                                </button>
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className="btn active btn-danger"
                                  data-toggle="button"
                                  aria-pressed="true"
                                >
                                  <i class="fa fa-trash" aria-hidden="true"></i> &nbsp; Delete
                                </button>
                              </td> */}
                              <td className="text-right">
                                <UncontrolledDropdown>
                                  <DropdownToggle
                                    className="btn-icon-only text-light"
                                    href="#pablo"
                                    role="button"
                                    size="sm"
                                    color=""
                                  >
                                    <i className="fas fa-ellipsis-v" />
                                  </DropdownToggle>
                                  <DropdownMenu className="dropdown-menu-arrow" right>
                                    <DropdownItem>
                                      <i class="fa fa-ban fa-warning" /> Suspend
                                    </DropdownItem>

                                    <DropdownItem
                                      href="#pablo"
                                      className="text-danger"
                                      onClick={handleDelete}
                                    >
                                      <i class="fa fa-trash" /> Delete
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </td>
                            </tr>
                          );
                        })
                    : 'No Admin found'}
                </tbody>
              </Table>

              {/* ///////////     Pagination Disabled Temp     ///////////// */}

              {/* <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter> */}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Admins;
