import React, {useState,useEffect } from 'react';
import {  Card, CardBody, CardHeader, Col, Row, Table,Button,Form,
  FormGroup, Input,Label,FormFeedback} from 'reactstrap';
import './Groups.css';
import { connect } from 'react-redux'
import { facultyOperations } from '../../states/ducks/Faculty';
import shortId from "shortid"

import Forms from "../Forms/FacultyForm"
import Modal from "../Modals/Modals"
function Groups(props) {
const {facData,addGroup,changeGroup,deletGroup}= props

const[isOpenedCreate,setIsOpenCreate]=useState(false);
const[isopenedEdit,setIsopenedEdit]=useState(false);
const [groupName,setGroupName]= useState("");
const [selectedGroup,setSelectedGroup]= useState("");
const [selectedFac,setSelectedFac]=useState("")
useEffect(() => {
  if(selectedGroup.length){
     let rightFaculty = facData.find(fac=>fac.groups.find(group =>group.id===selectedGroup))
     let groupName = rightFaculty.groups.find(group=>group.id === selectedGroup).name  
    setSelectedFac(rightFaculty.name)
    setGroupName(groupName)
  }
},[selectedGroup]);
const [error,setError]= useState(
  {
    groupNameError:false,
    groupNameErrorText:"Name must be at least 4 characters",
    facultyError:false,
    facultyErrorText:"Name must choose faculty",
  }
)
const [isOpenModal,setIsOpenModal]= useState(false)

const openCreateGroup = ()=>{
  setIsOpenCreate(!isOpenedCreate)
}
const addHendler = ()=>{
  if(groupName.length<4){
    setError({...error, groupNameError:true})
  }
 else if(selectedFac.length<1){
    setError({...error,facultyError:true})
  }
  else{
    
    let newGroup = {
      name:groupName,
      facultyName:selectedFac,
      id: shortId.generate()
    }
    addGroup(newGroup,selectedFac)
    setIsOpenCreate(false);
    setGroupName("")
    setSelectedFac("")
    setError({...error,facultyError:false,groupNameError:false})
  } 
}

const editHandler = (id)=>{
  setIsopenedEdit(!isopenedEdit)
  setSelectedGroup(id)
}

const delateHandler = (id)=>{
  setSelectedGroup(id)
  setIsOpenModal(true)
}

const onDelete = ()=>{
  deletGroup(selectedFac, selectedGroup)
  setIsOpenModal(false)
}

const editGroup = ()=>{
  if(groupName.length<3){
   
    setError({...error, groupNameError:true})
  }
  else if(!selectedFac){
    setError({...error,facultyError:true})
  }
  else {  
   changeGroup({
     id:selectedGroup,
     name:groupName,
     faculty:selectedFac
   })
    setIsopenedEdit(false)
    setSelectedFac("")
    setGroupName("")
    setError({...error,facultyError:false,groupNameError:false})
    setSelectedGroup("")
  } 
  
}

const canselHandler = (str)=>{
  if(groupName){
    setGroupName("")
  }
  else 
  str === "isopenedEdit"?setIsopenedEdit(false):setIsOpenCreate(false)
  setError({...error,facultyError:false,groupNameError:false})
}
  return (
    <div>
      {!isOpenedCreate &&!isopenedEdit &&(<Row>
        <Modal isOpen = {isOpenModal} deletedData={"Group"} onDelete={onDelete} onCansel ={()=>{
                          setIsOpenModal(false)
                       }}/>
          <Col >
            <Card>
              <CardHeader>
                 Group Table
              </CardHeader>
              <CardBody>
              <Col col="6"  sm="4" md="2" xl  className="mb-3 mb-xl-0 d-flex justify-content-end p-0" >
                <Button  color="success" onClick= {openCreateGroup}>Create Group</Button>
              </Col>
                <Table responsive>
                  <thead>
                  <tr >
                    <th >id</th>
                    <th >Name</th>
                    <th>Group</th>
                    <th >Actions</th>      
                  </tr>
                  </thead>
                  <tbody>
                    {facData&&facData.map(fac=>fac.groups.map((group)=>
                    
                      <tr key= {group.id}>
                      <td className="group-id">{group.id.slice(0,3)}</td>
                      <td >{group.facultyName}</td>
                      <td className="group-name">{group.name} </td>
                      <td className= "group-actions"> 
                       <span className="icons-span"><i className="fa fa-close fa-lg mt-2 red"  onClick={()=>{
                        delateHandler(group.id)
                       }}></i>
                       <i  className="fa fa-edit fa-lg mt-2 green" onClick={()=>{
                        editHandler(group.id)
                       }}></i>
                       </span>
                        </td>
                    </tr>)
                    )}

                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
     </Row>)}
    {isOpenedCreate &&  <Card>
              <CardHeader>
                Add Group
              </CardHeader>
              <CardBody>
                <Form action="">
                  <FormGroup>
                    <Label ><strong>Faculty:</strong></Label>
                    <Col xs="18" md="15">
                      <Input type="select" name="select" id="select" invalid={selectedFac.length<1&&error.facultyError} placeholder={""} onChange = {(e)=>{setSelectedFac(e.target.value)}}>
                      <option hidden ></option>
=                        {facData.map((fac)=>{
                          return( <option key = {fac.id}value={`${fac.name}`} >{fac.name}</option>)
                        })}
                      </Input>
                      </Col>
                      <FormFeedback>{error.facultyErrorText}</FormFeedback> 
                     <Label ><strong>Name:</strong></Label>
                    <Input type="text" name="name" invalid={groupName.length<4&&error.groupNameError} value={groupName}  onChange={(e)=>{setGroupName(e.target.value)}} />
                    <FormFeedback>{error.groupNameErrorText}</FormFeedback>
                   
                  </FormGroup>
                   
                </Form>
              </CardBody>
              <Col col="6"  sm="4" md="2" xl  className="mb-4 mb-xl-2 d-flex justify-content-end pr-4" >
                <Button className = "mr-2" color="danger" onClick = {()=>{
                  canselHandler("isOpenedCreate")
                }}>Cancel</Button>
                 <Button  color="success"   onClick = {addHendler}>Save</Button>
              </Col>
            </Card>}
            {/* {isOpenedCreate &&  <Forms data = {{facultyName:facultyName}} error={error} name="Group" type = {"Add"} onChange={setFacultyName} onSave={addFaculti} onCansel = {canselHandler}/>}  */}
            {isopenedEdit &&  <Card>
              <CardHeader>
                Edit Group
              </CardHeader>
              <CardBody>
                <Form action="" >
                <FormGroup>
                    <Label ><strong>Name:</strong></Label>
                    <Col xs="18" md="15">
                      <Input type="select" name="select" id="select" placeholder={""} invalid={!selectedFac&&error.facultyError} onChange = {(e)=>{setSelectedFac(e.target.value)}}>
            <option> {selectedFac}</option>
=                       
                      </Input>
                      <FormFeedback>{error.facultyErrorText}</FormFeedback>
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Label ><strong>Name</strong></Label>
                    <Input type="text" id="name" name="name" invalid={groupName.length<3&&error.groupNameError} value = {groupName}  onChange={(e)=>{setGroupName(e.target.value)}} />
                    <FormFeedback>{error.groupNameErrorText}</FormFeedback> 
                  </FormGroup>             
                </Form>
              </CardBody>
              <Col col="6"  sm="4" md="2" xl  className="mb-4 mb-xl-2 d-flex justify-content-end pr-4" >         
                <Button  color="danger" className = "mr-2" onClick = {()=>{
                  canselHandler("isopenedEdit")
                }}>Cancel</Button>
                 <Button  color="success"   onClick = {editGroup}>Save</Button>
              </Col>
            </Card>}
    </div>
    
  );
}
const mapDispatchToProps = { 
  addGroup:facultyOperations.addGroup,
  changeGroup:facultyOperations.editGroup,
  deletGroup:facultyOperations.deletGroup,
 }
 const mapStateToProps = (state ) => {
  return {
    facData: state.FacData.data 
   }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Groups)
