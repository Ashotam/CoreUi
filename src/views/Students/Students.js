import React, {useState } from 'react';
import {  Card, CardBody, CardHeader, Col, Row, Table,Button,Form,
  FormGroup, Input,Label,} from 'reactstrap';
import './Students.css';
import { connect } from 'react-redux'
import { studentOperations } from '../../states/ducks/Students';


function Groups(props) {
const {studentData,groupData,facData,addStudent,changeStudent,deletStudent}= props

const[isOpenedCreate,setIsOpenCreate]=useState(false);
const[isopenedEdit,setIsopenedEdit]=useState(false);
const [selectedStudent,setSelectedStudent]= useState(0);
const [studentName,setStudentName]= useState("");
const [studentLastName,setStudentLastName]= useState("");
const [studentEmail,setStudentEmail]= useState("")
const [studentPhone,setStudentPhone]= useState("")
const [selectedFac,setSelectedFac]=useState("")
const [selectedGroup,setSelectedGroup]= useState("");
const openCreateStudent = ()=>{
  setIsOpenCreate(!isOpenedCreate)
}

const addHendler = ()=>{
  if(studentName&&studentLastName,studentEmail,studentPhone,selectedFac,selectedGroup){
    let nextId =groupData.length+1;
    let newGroup = {
      id:nextId,
      name:studentName,
      lastName:studentLastName,
      email:studentEmail,
      phone:studentPhone,
      faculty:selectedFac,
      group:selectedGroup
    }
    addStudent(newGroup)
    setIsOpenCreate(false);
    setStudentName("");
    setStudentLastName("");
    setStudentEmail();
    setStudentPhone("")
    setSelectedGroup("")
    setSelectedFac("")
  } 
}

const editHandler = (id)=>{
  setIsopenedEdit(!isopenedEdit)
  setSelectedStudent(id)
  setStudentName(studentData[id-1].name)
  setStudentLastName(studentData[id-1].lastName)
  setStudentEmail(studentData[id-1].email)
  setStudentPhone(studentData[id-1].phone)



}

const delateHandler = (id)=>{
  deletStudent(id)
}

const editStudent = ()=>{
  
    
    changeStudent({
     id:selectedStudent,
     name:studentName,
     lastName:studentLastName,
     email:studentEmail,
     phone:studentPhone,
     faculty:selectedFac,
     group:selectedGroup
   })
   setIsopenedEdit(false)
  
}

const canselHandler = (str)=>{
  if(studentName){
    setStudentName("")
  }
  else 
  str === "isopenedEdit"?setIsopenedEdit(false):setIsOpenCreate(false)
}
  return (
    <div>
      {!isOpenedCreate &&!isopenedEdit &&(<Row>
          <Col >
            <Card>
              <CardHeader>
                 Student Table
              </CardHeader>
            
              <CardBody>
              <Col col="6"  sm="4" md="2" xl  className="mb-3 mb-xl-0 d-flex justify-content-end p-0" >
                <Button  color="success" onClick= {openCreateStudent}>Create Student</Button>
              </Col>
                <Table responsive>
                  <thead>
                  <tr >
                    <th>id</th>
                    <th>Name</th>
                    <th>Lastname</th>
                    <th>Email</th>
                    <th >Phone</th>
                    <th>Faculties</th>
                    <th>Group</th>
                    <th>Actions</th>      
                  </tr>
                  </thead>
                  <tbody>
                    {studentData&&studentData.map(student=>
                      <tr key = {student.id}>
                      <td >{student.id}</td>
                      <td >{student.name} </td>
                      <td >{student.lastName} </td>
                      <td >{student.email} </td>
                      <td >{student.phone} </td>
                      <td >{student.faculty}</td>
                      <td >{student.group} </td>
                      <td > 
                       <span className="icons-span"><i className="fa fa-close fa-lg mt-2 red"  onClick={()=>{
                        delateHandler(student.id)
                       }}></i>
                       <i  className="fa fa-edit fa-lg mt-2 green" onClick={()=>{
                        editHandler(student.id)
                       }}></i>
                       </span>
                        </td>
                    </tr>
                    )}

                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
     </Row>)}
    {isOpenedCreate &&  <Card>
      {/* <ContactForm onSubmit={submit}></ContactForm> */}
              <CardHeader>
                Edit Group
              </CardHeader>
              <CardBody>
                <Form action="" method="post">
                  <FormGroup>
                  <Label ><strong>Name:</strong></Label>
                    <Input type="text" id="name" name="name" value={studentName}  onChange={(e)=>{setStudentName(e.target.value)}} />
                    <Label ><strong>Lastname:</strong></Label>
                    <Input type="text" id="lastname" name="lastname" value={studentLastName}  onChange={(e)=>{setStudentLastName(e.target.value)}} />
                    <Label ><strong>Email:</strong></Label>
                    <Input type="email" id="email" name="email" value={studentEmail}  onChange={(e)=>{setStudentEmail(e.target.value)}} />
                    <Label ><strong>Phone:</strong></Label>
                    <Input type="text" id="phone" name="phone" value={studentPhone}  onChange={(e)=>{setStudentPhone(e.target.value)}} />
                    <Label ><strong>Faculty:</strong></Label>
                    <Col xs="18" md="15">
                      <Input type="select" name="selectFaculty" id="selectFaculty" placeholder={""} onChange = {(e)=>{setSelectedFac(e.target.value)}}>
                      <option hidden ></option>
=                        {facData.map((fac)=>{
                          return( <option key = {fac.id}value={`${fac.name}`} >{fac.name}</option>)
                        })}
                      </Input>
                    </Col>
                    <Label ><strong>Group:</strong></Label>
                    <Col xs="18" md="15">
                      <Input type="select" name="selectGroup" id="selectGroup" placeholder={""} onChange = {(e)=>{setSelectedGroup(e.target.value)}}>
                      <option hidden ></option>
=                        {groupData.map((group)=>{
                          return( <option key = {group.id}value={`${group.name}`} >{group.name}</option>)
                        })}
                      </Input>
                    </Col>
                  </FormGroup>
                     
                </Form>
              </CardBody>
              <Col col="6"  sm="4" md="2" xl  className="mb-4 mb-xl-2 d-flex justify-content-end pr-4" >
                <Button  color="success"  className = "mr-2" onClick = {addHendler}>Save</Button>
                <Button  color="danger" onClick = {()=>{
                  canselHandler("isOpenedCreate")
                }}>Cancel</Button>
              </Col>
              
            </Card>}
            
            {isopenedEdit &&  <Card>
              <CardHeader>
                Edit Student
              </CardHeader>
              <CardBody>
                <Form action="" >
                <FormGroup>
                  <Label ><strong>Name:</strong></Label>
                    <Input type="text" id="name" name="name" value={studentName}  onChange={(e)=>{setStudentName(e.target.value)}} />
                    <Label ><strong>Lastname:</strong></Label>
                    <Input type="text" id="lastname" name="lastname" value={studentLastName}  onChange={(e)=>{setStudentLastName(e.target.value)}} />
                    <Label ><strong>Email:</strong></Label>
                    <Input type="email" id="email" name="email" value={studentEmail}  onChange={(e)=>{setStudentEmail(e.target.value)}} />
                    <Label ><strong>Phone:</strong></Label>
                    <Input type="text" id="phone" name="phone" value={studentPhone}  onChange={(e)=>{setStudentPhone(e.target.value)}} />
                    <Label ><strong>Faculty:</strong></Label>
                    <Col xs="18" md="15">
                      <Input type="select" name="selectFaculty" id="selectFaculty" placeholder={""} onChange = {(e)=>{setSelectedFac(e.target.value)}}>
                      <option hidden ></option>
=                        {facData.map((fac)=>{
                          return( <option key = {fac.id}value={`${fac.name}`} >{fac.name}</option>)
                        })}
                      </Input>
                    </Col>
                    <Label ><strong>Group:</strong></Label>
                    <Col xs="18" md="15">
                      <Input type="select" name="selectGroup" id="selectGroup" placeholder={""} onChange = {(e)=>{setSelectedGroup(e.target.value)}}>
                      <option hidden ></option>
=                        {groupData.map((group)=>{
                          return( <option key = {group.id}value={`${group.name}`} >{group.name}</option>)
                        })}
                      </Input>
                    </Col>
                  </FormGroup>          
                </Form>
              </CardBody>
              <Col col="6"  sm="4" md="2" xl  className="mb-4 mb-xl-2 d-flex justify-content-end pr-4" >
                <Button  color="success"  className = "mr-2" onClick = {editStudent}>Save</Button>
                <Button  color="danger" onClick = {()=>{
                  canselHandler("isopenedEdit")
                }}>Cancel</Button>
              </Col>
            </Card>}
    </div>
    
  );
}
const mapDispatchToProps = { 
  addStudent:studentOperations.addStudent,
  changeStudent:studentOperations.editStudent,
  deletStudent:studentOperations.deletStudent,
 }
 const mapStateToProps = (state ) => {
  return {
    groupData: state.GroupData.data,
    facData: state.FacData.data,
    studentData:state.StudentData.data
   }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Groups)
