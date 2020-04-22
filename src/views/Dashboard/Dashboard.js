import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Col, Table, Input } from "reactstrap";
import { connect } from "react-redux";

function Dashboard(props) {
  const { facData, studentData } = props;
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentLastName, setStudentLastName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [selectedFac, setSelectedFac] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [groupData, setGroupData] = useState(null);
  useEffect(() => {
    let allGroupData = [];
    console.log(selectedFac);
    allGroupData = facData.reduce(function (accumulator, currentValue) {
      currentValue.groups.map((group) => accumulator.push(group));

      return accumulator;
    }, allGroupData);
    const groupData = allGroupData;
    setGroupData(groupData);
  }, []);
  useEffect(() => {
    if (selectedFac.length) {
      const groupData = facData.find((fac) => fac.name === selectedFac).groups;
      setGroupData(groupData);
    }
  }, [selectedFac]);
  const serchedData = (() => {
    let serchedData = [...studentData];
    if (studentId) {
      serchedData = serchedData.filter((student) => student.id == studentId);
    }
    if (studentName) {
      serchedData = serchedData.filter(
        (student) =>
          student.name.toLowerCase().includes(studentName.toLowerCase()) ===
          true
      );
    }
    if (studentLastName) {
      serchedData = serchedData.filter(
        (student) =>
          student.lastName
            .toLowerCase()
            .includes(studentLastName.toLowerCase()) === true
      );
    }
    if (studentEmail) {
      serchedData = serchedData.filter(
        (student) =>
          student.email.toLowerCase().includes(studentEmail.toLowerCase()) ===
          true
      );
    }
    if (studentPhone) {
      serchedData = serchedData.filter(
        (student) =>
          student.phone.toLowerCase().includes(studentPhone.toLowerCase()) ===
          true
      );
    }
    if (selectedFac) {
      serchedData = serchedData.filter(
        (student) => student.faculty === selectedFac
      );
    }
    if (selectedGroup) {
      serchedData = serchedData.filter(
        (student) => student.group === selectedGroup
      );
    }
    return serchedData;
  })();
  const selectFaculty = (e) => {
    setSelectedFac(e.target.value);
    setSelectedGroup("");
  };
  return (
    <div className="animated fadeIn">
      <Col>
        <Card>
          <CardHeader>Dashboard</CardHeader>

          <CardBody>
            <Table responsive>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Lastname</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Faculties</th>
                  <th>Group</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="pl-1">
                    <Input
                      type="text"
                      placeholder="Search by Id..."
                      name="id"
                      value={studentId}
                      onChange={(e) => {
                        setStudentId(e.target.value);
                      }}
                    />
                  </td>
                  <td className="pl-1">
                    <Input
                      type="text"
                      placeholder="Search by Name..."
                      name="name"
                      value={studentName}
                      onChange={(e) => {
                        setStudentName(e.target.value);
                      }}
                    />
                  </td>
                  <td className="pl-1">
                    <Input
                      type="text"
                      placeholder="Search by LastName..."
                      name="LastName"
                      value={studentLastName}
                      onChange={(e) => {
                        setStudentLastName(e.target.value);
                      }}
                    />
                  </td>
                  <td className="pl-1">
                    <Input
                      type="text"
                      placeholder="Search by Email..."
                      name="Email"
                      value={studentEmail}
                      onChange={(e) => {
                        setStudentEmail(e.target.value);
                      }}
                    />
                  </td>
                  <td className="pl-1">
                    <Input
                      type="text"
                      placeholder="Search by Phone..."
                      name="Phone"
                      value={studentPhone}
                      onChange={(e) => {
                        setStudentPhone(e.target.value);
                      }}
                    />
                  </td>
                  <td className="pl-1">
                    <Input
                      type="select"
                      name="selectFaculty"
                      id="selectFaculty"
                      placeholder={""}
                      onChange={(e) => {
                        selectFaculty(e);
                      }}
                    >
                      <option value=""></option>
                      {facData.map((fac) => {
                        return (
                          <option key={fac.id} value={`${fac.name}`}>
                            {fac.name}
                          </option>
                        );
                      })}
                    </Input>
                  </td>
                  <td className="pl-1">
                    <Input
                      type="select"
                      name="selectFaculty"
                      id="selectFaculty"
                      placeholder={""}
                      onChange={(e) => {
                        setSelectedGroup(e.target.value);
                      }}
                    >
                      <option value=""></option>
                      {groupData &&
                        groupData.map((group) => {
                          return (
                            <option key={group.id} value={`${group.name}`}>
                              {group.name}
                            </option>
                          );
                        })}
                    </Input>
                  </td>
                </tr>
                {serchedData &&
                  serchedData.map((student) => (
                    <tr key={student.id}>
                      <td>{student.id}</td>
                      <td>{student.name} </td>
                      <td>{student.lastName} </td>
                      <td>{student.email} </td>
                      <td>{student.phone} </td>
                      <td>{student.faculty}</td>
                      <td>{student.group} </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    groupData: state.GroupData.data,
    facData: state.FacData.data,
    studentData: state.StudentData.data,
  };
};
export default connect(mapStateToProps, null)(Dashboard);
