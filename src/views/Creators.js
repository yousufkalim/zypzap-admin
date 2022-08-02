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

const Creators = () => {
  let [page] = useState(window.location.pathname.split('/').pop());
  // let [filter, setFilter] = useState('all');
  const { creators } = Store();
  const { users } = Store();
  const updateStore = UpdateStore();
  let [sortedData, setSortedData] = useState('');

  useEffect(() => {
    getCreators();
  }, []);

  const getCreators = async () => {
    const data = await api('get', '/users');
    if (data) {
      updateStore({
        creators: data.filter(function (r) {
          return r.role === 'Creator';
        }),
      });
    }
  };

  const handleStatus = (id, status) => {
    let method = 'put';
    let uri = '/users';
    uri = uri + `/${id}`;

    api(method, uri, { status }).then((res) => {
      toast.success('Creator updated successfully');
      getCreators();
    });
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
                    Creators
                  </h3>

                  <SearchBar />

                  <UncontrolledDropdown>
                    <div style={{ display: 'flex' }}>
                      <ExportExecl
                        Users={creators
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
                        {sortedData ? sortedData : 'Sort By'}
                      </DropdownToggle>
                    </div>
                    <DropdownMenu>
                      <DropdownItem name="tester" onClick={() => setSortedData('A-Z')}>
                        A-Z
                      </DropdownItem>
                      <DropdownItem
                        name="admins"
                        style={{ textTransform: 'capitalize' }}
                        onClick={() => setSortedData('Date Created')}
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
                  {creators
                    ? creators

                        .sort((a, b) => {
                          if (sortedData === 'A-Z') {
                            return a.username.localeCompare(b.username);
                          } else if (sortedData === 'Date Created') {
                            return new Date(b.createdAt) - new Date(a.createdAt);
                          }
                        })

                        ?.map((creator) => {
                          return (
                            <tr>
                              <td>{creator.username}</td>
                              <td>{creator.email}</td>
                              <td className={creator.status === 'Banned' ? 'text-red' : ''}>
                                {creator.status}
                              </td>
                              <td>{new Date(creator.createdAt).toDateString()}</td>
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
                                    {creator.status === 'Active' ? (
                                      <DropdownItem
                                        onClick={() => handleStatus(creator._id, 'Suspended')}
                                      >
                                        <i class="fa fa-ban fa-warning" /> Suspend
                                      </DropdownItem>
                                    ) : (
                                      <DropdownItem
                                        className="text-success"
                                        onClick={() => handleStatus(creator._id, 'Active')}
                                      >
                                        <i class="fas fa-user-check" /> Activate
                                      </DropdownItem>
                                    )}

                                    {creator.status !== 'Banned' ? (
                                      <DropdownItem
                                        href="#pablo"
                                        className="text-danger"
                                        onClick={() => handleStatus(creator._id, 'Banned')}
                                      >
                                        <i class="fa fa-trash" /> Ban
                                      </DropdownItem>
                                    ) : (
                                      ''
                                    )}
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </td>
                            </tr>
                          );
                        })
                    : 'No Creator found'}
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

export default Creators;
