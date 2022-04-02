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
import { useState, useEffect } from "react";
import api from "api";
import { Store, UpdateStore } from "StoreContext";
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
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

const Newsletters = () => {
  let [page] = useState(window.location.pathname.split("/").pop());
  let [filter, setFilter] = useState("all");
  const { newsletters } = Store();
  const updateStore = UpdateStore();

  useEffect(() => {
    getNewsletters();
  }, []);

  const getNewsletters = async () => {
    const data = await api("get", "/newsletters");

    if (data) {
      updateStore({ newsletters: data.newsletters });
    }
  };

  const handleFiler = (e) => {
    setFilter(e.target.name);
  };

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
                  <h3 className="mb-0" style={{ textTransform: "capitalize" }}>
                    {page === "all" ? "Newsletters" : page + "s"}
                  </h3>
                  <UncontrolledDropdown>
                    <DropdownToggle
                      color="primary"
                      name
                      href="#pablo"
                      role="button"
                      caret
                      size="md"
                      style={{
                        textTransform: "capitalize",
                      }}
                    >
                      {filter === "all" ? "Filter by type" : filter + "s"}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem name="all" onClick={handleFiler}>
                        All
                      </DropdownItem>
                      <DropdownItem name="tester" onClick={handleFiler}>
                        Beta Testers
                      </DropdownItem>
                      <DropdownItem name="newsletter" onClick={handleFiler}>
                        Newsletters
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Email</th>
                    <th scope="col">Type</th>
                    <th scope="col">Subscribed At</th>
                  </tr>
                </thead>
                <tbody>
                  {newsletters
                    .filter((a) => {
                      if (filter === "all") {
                        return a.type === page;
                      } else if (filter === "tester") {
                        return a.type === page && a.tester === true;
                      } else if (filter === "newsletter") {
                        return a.type === page && a.tester === false;
                      }
                    })
                    .map((newsletter) => {
                      return (
                        <tr>
                          <td>{newsletter.email}</td>
                          <td>{newsletter.tester ? "Tester" : "Newsletter"}</td>
                          <td>
                            {new Date(newsletter.createdAt).toDateString()}
                          </td>
                        </tr>
                      );
                    })}
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

export default Newsletters;
