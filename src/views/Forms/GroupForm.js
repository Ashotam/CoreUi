import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Button,
  Form,
  FormGroup,
  FormFeedback,
  Input,
  Label,
} from "reactstrap";

function Forms(props) {
  const {
    type,
    facData,
    selectedFac,
    groupName,
    error,
    setSelectedFac,
    setGroupName,
    canselHandler,
    addHendler,
  } = props;
  return (
    <div>
      <Card>
        <CardHeader>Add Group</CardHeader>
        <CardBody>
          <Form action="">
            <FormGroup>
              <Label>
                <strong>Faculty:</strong>
              </Label>
              {type === "creat" ? (
                <Col xs="18" md="15">
                  <Input
                    type="select"
                    name="select"
                    id="select"
                    invalid={selectedFac.length < 1 && error.facultyError}
                    placeholder={""}
                    onChange={(e) => {
                      setSelectedFac(e.target.value);
                    }}
                  >
                    <option hidden></option>={" "}
                    {facData.map((fac) => {
                      return (
                        <option key={fac.id} value={`${fac.name}`}>
                          {fac.name}
                        </option>
                      );
                    })}
                  </Input>
                </Col>
              ) : (
                <Col xs="18" md="15">
                  <Input
                    type="select"
                    name="select"
                    id="select"
                    invalid={selectedFac.length < 1 && error.facultyError}
                    placeholder={""}
                  >
                    <option hidden>{selectedFac}</option>= })}
                  </Input>
                </Col>
              )}

              <FormFeedback>{error.facultyErrorText}</FormFeedback>
              <Label>
                <strong>Name:</strong>
              </Label>
              <Input
                type="text"
                name="name"
                invalid={groupName.length < 4 && error.groupNameError}
                value={groupName}
                onChange={(e) => {
                  setGroupName(e.target.value);
                }}
              />
              <FormFeedback>{error.groupNameErrorText}</FormFeedback>
            </FormGroup>
          </Form>
        </CardBody>
        <Col
          col="6"
          sm="4"
          md="2"
          xl
          className="mb-4 mb-xl-2 d-flex justify-content-end pr-4"
        >
          <Button
            className="mr-2"
            color="danger"
            onClick={() => {
              canselHandler(type);
            }}
          >
            Cancel
          </Button>
          <Button color="success" onClick={addHendler}>
            Save
          </Button>
        </Col>
      </Card>
    </div>
  );
}

export default Forms;
