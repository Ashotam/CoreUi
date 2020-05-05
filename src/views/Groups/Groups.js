import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button,
} from "reactstrap";
import "./Groups.css";
import { connect } from "react-redux";
import { facultyOperations } from "../../states/ducks/Faculty";
import shortId from "shortid";

import Forms from "../Forms/GroupForm.js";
import Modal from "../Modals/Modals";
function Groups(props) {
  const { facData, addGroup, changeGroup, deletGroup } = props;

  const [isOpenedCreate, setIsOpenCreate] = useState(false);
  const [isopenedEdit, setIsopenedEdit] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedFac, setSelectedFac] = useState("");
  useEffect(() => {
    if (selectedGroup.length) {
      let rightFaculty = facData.find((fac) =>
        fac.groups.find((group) => group.id === selectedGroup)
      );
      let groupName = rightFaculty.groups.find(
        (group) => group.id === selectedGroup
      ).name;
      setSelectedFac(rightFaculty.name);
      setGroupName(groupName);
    }
  }, [selectedGroup]);
  const [error, setError] = useState({
    groupNameError: false,
    groupNameErrorText: "Name must be at least 4 characters",
    facultyError: false,
    facultyErrorText: "Name must choose faculty",
  });
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openCreateGroup = () => {
    setIsOpenCreate(!isOpenedCreate);
  };
  const addHendler = () => {
    if (groupName.length < 4) {
      setError({ ...error, groupNameError: true });
    } else if (selectedFac.length < 1) {
      setError({ ...error, facultyError: true });
    } else {
      let newGroup = {
        name: groupName,
        facultyName: selectedFac,
        id: shortId.generate(),
      };
      addGroup(newGroup, selectedFac);
      setIsOpenCreate(false);
      setGroupName("");
      setSelectedFac("");
      setError({ ...error, facultyError: false, groupNameError: false });
    }
  };

  const editHandler = (id) => {
    setIsopenedEdit(!isopenedEdit);
    setSelectedGroup(id);
  };

  const delateHandler = (id) => {
    setSelectedGroup(id);
    setIsOpenModal(true);
  };

  const onDelete = () => {
    deletGroup(selectedFac, selectedGroup);
    setIsOpenModal(false);
  };

  const editGroup = () => {
    if (groupName.length < 3) {
      setError({ ...error, groupNameError: true });
    } else if (!selectedFac) {
      setError({ ...error, facultyError: true });
    } else {
      changeGroup({
        id: selectedGroup,
        name: groupName,
        faculty: selectedFac,
      });
      setIsopenedEdit(false);
      setSelectedFac("");
      setGroupName("");
      setError({ ...error, facultyError: false, groupNameError: false });
      setSelectedGroup("");
    }
  };

  const canselHandler = (str) => {
    if (groupName) {
      setGroupName("");
    } else str === "edit" ? setIsopenedEdit(false) : setIsOpenCreate(false);
    setError({ ...error, facultyError: false, groupNameError: false });
  };
  return (
    <div>
      {!isOpenedCreate && !isopenedEdit && (
        <Row>
          <Modal
            isOpen={isOpenModal}
            deletedData={"Group"}
            onDelete={onDelete}
            onCansel={() => {
              setIsOpenModal(false);
            }}
          />
          <Col>
            <Card>
              <CardHeader>Group Table</CardHeader>
              <CardBody>
                <Col
                  col="6"
                  sm="4"
                  md="2"
                  xl
                  className="mb-3 mb-xl-0 d-flex justify-content-end p-0"
                >
                  <Button color="success" onClick={openCreateGroup}>
                    Create Group
                  </Button>
                </Col>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>id</th>
                      <th>Name</th>
                      <th>Group</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {facData &&
                      facData.map((fac) =>
                        fac.groups.map((group) => (
                          <tr key={group.id}>
                            <td className="group-id">{group.id.slice(0, 3)}</td>
                            <td>{group.facultyName}</td>
                            <td className="group-name">{group.name} </td>
                            <td className="group-actions">
                              <span className="icons-span">
                                <i
                                  className="fa fa-close fa-lg mt-2 red"
                                  onClick={() => {
                                    delateHandler(group.id);
                                  }}
                                ></i>
                                <i
                                  className="fa fa-edit fa-lg mt-2 green"
                                  onClick={() => {
                                    editHandler(group.id);
                                  }}
                                ></i>
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}
      {isOpenedCreate && (
        <Forms
          type={"creat"}
          facData={facData}
          selectedFac={selectedFac}
          groupName={groupName}
          error={error}
          setSelectedFac={setSelectedFac}
          setGroupName={setGroupName}
          canselHandler={canselHandler}
          addHendler={addHendler}
        />
      )}

      {isopenedEdit && (
        <Forms
          type={"edit"}
          facData={facData}
          selectedFac={selectedFac}
          groupName={groupName}
          error={error}
          setSelectedFac={setSelectedFac}
          setGroupName={setGroupName}
          canselHandler={canselHandler}
          addHendler={editGroup}
        />
      )}
    </div>
  );
}
const mapDispatchToProps = {
  addGroup: facultyOperations.addGroup,
  changeGroup: facultyOperations.editGroup,
  deletGroup: facultyOperations.deletGroup,
};
const mapStateToProps = (state) => {
  return {
    facData: state.FacData.data,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Groups);
