import React, {useState,useEffect } from 'react';
import {  Card, CardBody, CardHeader, Col, Row, Table,Button,Form,
  FormGroup, Input,Label,FormFeedback} from 'reactstrap';
import './Students.css';
import { connect } from 'react-redux'
import { studentOperations } from '../../states/ducks/Students';
import Modal from "../Modals/Modals"
function Groups(props) {
const {studentData,facData,addStudent,changeStudent,deletStudent}= props

const[isOpenedCreate,setIsOpenCreate]=useState(false);
const[isopenedEdit,setIsopenedEdit]=useState(false);
const [selectedStudent,setSelectedStudent]= useState(0);
const [studentName,setStudentName]= useState("");
const [studentLastName,setStudentLastName]= useState("");
const [studentEmail,setStudentEmail]= useState("")
const [studentPhone,setStudentPhone]= useState("")
const [selectedFac,setSelectedFac]=useState("")
const [groupData,setGroupData]=useState(null)
useEffect(() => {
  if(selectedFac.length){
     const groupData = facData.find(fac=>fac.name===selectedFac).groups
    
      setGroupData(groupData)
  }
  console.log(groupData)
},[selectedFac]);
const [selectedGroup,setSelectedGroup]= useState("");
const [error,setError]= useState(
  {
    nameError:false,
    nameErrorTexet:"Name must be at least 4 characters",
    lastNameError:false,
    lastNameErrorTexet:"Lastname must be at least 4 characters",
    phoneError:false,
    phoneErrorText:"Write correct phone Number",
    emailError:false,
    emailErrorText:"Write correct email",
    groupError:false,
    groupNameErrorText:"Name must choose group",
    facultyError:false,
    facultyErrorText:"Name must choose faculty",
  }
)
const [isOpenModal,setIsOpenModal]= useState(false)

const  validateEmail=(email)=> {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
const validatePhone =(phone)=> {
  var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return phoneno.test(String(phone).toLowerCase());
}
const openCreateStudent = ()=>{
  setIsOpenCreate(!isOpenedCreate)
}

const addHendler = ()=>{
  console.log(validatePhone("fdsfsd"),validateEmail("asdsa"))
  if(studentName<4){
    setError({...error, nameError:true})
  }
  else if(studentLastName<4){
    setError({...error, lastNameError:true})
  }
  
  else if(!validateEmail(studentEmail)){
    setError({...error, emailError:true})
  }
  else if(!validatePhone(studentPhone)){
    setError({...error, phoneError:true})
  }
  else if(!selectedFac.length){
    setError({...error, facultyError:true})
  }
  else if(!selectedGroup.length){
    setError({...error, groupError:true})
  }
  else{
    let nextId = studentData.length+1;
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
    setError({...error, nameError:false,lastNameError:false,emailError:false,phoneError:false,facultyError:false,groupError:false})
  } 
}

const editHandler = (id)=>{
  setIsopenedEdit(!isopenedEdit)
  setSelectedStudent(id)
  setStudentName(studentData[id-1].name)
  setStudentLastName(studentData[id-1].lastName)
  setStudentEmail(studentData[id-1].email)
  setStudentPhone(studentData[id-1].phone)
  setSelectedFac(studentData[id-1].faculty)
  setSelectedGroup(studentData[id-1].group)

}


const delateHandler = (id)=>{
  setSelectedStudent(id)
  setIsOpenModal(true)
}
const onDelete = ()=>{
  deletStudent(selectedStudent)
  setIsOpenModal(false)
}

const editStudent = ()=>{
  if(studentName<4){
    setError({...error, nameError:true})
  }
  else if(studentLastName<4){
    setError({...error, lastNameError:true})
  }
  
  else if(!validateEmail(studentEmail) ){
    setError({...error, emailError:true})
  }
  else if(!validatePhone(studentPhone)){
    setError({...error, phoneError:true})
  }
  else if(!selectedFac.length){
    setError({...error, facultyError:true})
  }
  else if(!selectedGroup.length){
    setError({...error, groupError:true})
  }
  else{
    changeStudent({
      id:selectedStudent,
      name:studentName,
      lastName:studentLastName,
      email:studentEmail,
      phone:studentPhone,
      faculty:selectedFac,
      group:selectedGroup
    })
    setStudentName("");
    setStudentLastName("");
    setStudentEmail();
    setStudentPhone("")
    setSelectedGroup("")
    setSelectedFac("")
    setIsopenedEdit(false)
    setError({...error, nameError:false,lastNameError:false,emailError:false,phoneError:false,facultyError:false,groupError:false})
  } 
}

const canselHandler = (str)=>{
  if(studentName){
    setStudentName("");
    setStudentLastName("");
    setStudentEmail("");
    setStudentPhone("")
    setSelectedGroup("")
    setSelectedFac("")
  }
  else 
  str === "isopenedEdit"?setIsopenedEdit(false):setIsOpenCreate(false);
  setError({...error, nameError:false,lastNameError:false,emailError:false,phoneError:false,facultyError:false,groupError:false})
}
  return (
    <div>
      {!isOpenedCreate &&!isopenedEdit &&(<Row>
        <Modal isOpen = {isOpenModal} deletedData={"Student"} onDelete={onDelete} onCansel ={()=>{
                          setIsOpenModal(false)
                       }}/>
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
              <CardHeader>
                Edit Group
              </CardHeader>
              <CardBody>
                <Form action="" method="post">
                  <FormGroup>
                  <Label ><strong>Name:</strong></Label>
                    <Input type="text" id="name" name="name" invalid={studentName.length <4 &&error.nameError} value={studentName}  onChange={(e)=>{setStudentName(e.target.value)}} />
                    <FormFeedback>{error.nameErrorTexet}</FormFeedback> 
                    <Label ><strong>Lastname:</strong></Label>
                    <Input type="text" id="lastname" name="lastname" invalid={studentLastName.length<4 && error.lastNameError} value={studentLastName}  onChange={(e)=>{setStudentLastName(e.target.value)}} />
                    <FormFeedback>{error.lastNameErrorTexet}</FormFeedback> 
                    <Label ><strong>Email:</strong></Label>
                    <Input type="email" id="email" name="email"  invalid={!validateEmail(studentEmail)&&error.emailError} value={studentEmail}  onChange={(e)=>{setStudentEmail(e.target.value)}} />
                    <FormFeedback>{error.emailErrorText}</FormFeedback> 
                    <Label ><strong>Phone:</strong></Label>
                    <Input type="text" id="phone" name="phone" invalid={!validatePhone(studentPhone)&&error.phoneError} value={studentPhone}  onChange={(e)=>{setStudentPhone(e.target.value)}} />
                    <FormFeedback>{error.phoneErrorText }</FormFeedback>
                    <Label ><strong>Faculty:</strong></Label> 
                    <Col xs="18" md="15">
                      <Input type="select" name="selectFaculty" id="selectFaculty" invalid={selectedFac.length===0 && error.facultyError} onChange = {(e)=>{setSelectedFac(e.target.value)}}>
                           <option hidden >{}</option>
=                        {facData.map((fac)=>{
                          return( <option key = {fac.id}value={`${fac.name}`} >{fac.name}</option>)
                        })}
                      </Input>
                      <FormFeedback>{error.facultyErrorText}</FormFeedback> 
                    </Col>
                    <Label ><strong>Group:</strong></Label>
                    <Col xs="18" md="15">
                      <Input type="select" name="selectGroup" id="selectGroup" invalid={selectedGroup.length===0 && error.groupError}  onChange = {(e)=>{setSelectedGroup(e.target.value)}}>
                      <option hidden ></option>
=                        {groupData&&groupData.map((group)=>{
                          return( <option key = {group.id}value={`${group.name}`} >{group.name}</option>)
                        })}
                      </Input>
                      <FormFeedback>{error.groupNameErrorText}</FormFeedback> 
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
                    <Input type="text" id="name" name="name" invalid={studentName.length <4 &&error.nameError} value={studentName}  onChange={(e)=>{setStudentName(e.target.value)}} />
                    <FormFeedback>{error.nameErrorTexet}</FormFeedback>
                    <Label ><strong>Lastname:</strong></Label>
                    <Input type="text" id="lastname" name="lastname" invalid={studentLastName.length<4 && error.lastNameError} value={studentLastName}  onChange={(e)=>{setStudentLastName(e.target.value)}} />
                    <FormFeedback>{error.lastNameErrorTexet}</FormFeedback> 
                    <Label ><strong>Email:</strong></Label>
                    <Input type="email" id="email" name="email" invalid={!validateEmail(studentEmail)&&error.emailError} value={studentEmail}  onChange={(e)=>{setStudentEmail(e.target.value)}} />
                    <FormFeedback>{error.emailErrorText}</FormFeedback> 
                    <Label ><strong>Phone:</strong></Label>
                    <Input type="text" id="phone" name="phone" invalid={!validatePhone(studentPhone)&&error.phoneError} value={studentPhone}  onChange={(e)=>{setStudentPhone(e.target.value)}} />
                    <FormFeedback>{error.phoneErrorText }</FormFeedback>
                    <Label ><strong>Faculty:</strong></Label>
                    <Col xs="18" md="15">
                      <Input type="select" name="selectFaculty" invalid={selectedFac.length===0 && error.facultyError} id="selectFaculty" placeholder={""} onChange = {(e)=>{setSelectedFac(e.target.value)}}>
                             <option hidden >{selectedFac}</option>
=                        {facData.map((fac)=>{
                          return( <option key = {fac.id}value={`${fac.name}`} >{fac.name}</option>)
                        })}
                      </Input>
                      <FormFeedback>{error.facultyErrorText}</FormFeedback> 
                    </Col>
                    <Label ><strong>Group:</strong></Label>
                    <Col xs="18" md="15">
                      <Input type="select" name="selectGroup" id="selectGroup" invalid={selectedGroup.length===0 && error.groupError} onChange = {(e)=>{setSelectedGroup(e.target.value)}}>
                      <option hidden >{selectedGroup}</option>
=                        {groupData&&groupData.map((group)=>{
                          return( <option key = {group.id}value={`${group.name}`} >{group.name}</option>)
                        })}
                      </Input>
                      <FormFeedback>{error.groupNameErrorText}</FormFeedback> 
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
