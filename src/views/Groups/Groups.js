import React, {useState } from 'react';
import {  Card, CardBody, CardHeader, Col, Row, Table,Button,Form,
  FormGroup, Input,Label,} from 'reactstrap';
import './Groups.css';
import { connect } from 'react-redux'
import { groupOperations } from '../../states/ducks/Groups';

function Groups(props) {
const {groupData,facData,addGroup,changeGroup,deletGroup}= props

const[isOpenedCreate,setIsOpenCreate]=useState(false);
const[isopenedEdit,setIsopenedEdit]=useState(false);
const [groupName,setGroupName]= useState("");
const [selectedGroup,setSelectedGroup]= useState(0);
const [selectedFac,setSelectedFac]=useState("")
const openCreateGroup = ()=>{
  setIsOpenCreate(!isOpenedCreate)
}
const addHendler = ()=>{
  if(groupName&&selectedFac){
    let nextId =groupData.length+1;
    let newGroup = {
      id:nextId,
      name:groupName,
      faculty:selectedFac
    }
    addGroup(newGroup)
    setIsOpenCreate(false);
    setGroupName("")
    setSelectedFac("")
  } 
}

const editHandler = (id)=>{
  setIsopenedEdit(!isopenedEdit)
  setSelectedGroup(id)
  setGroupName(groupData[id-1].name)
}

const delateHandler = (id)=>{
  deletGroup(id)
}

const editGroup = ()=>{
  if(groupName!==groupData[selectedGroup-1].name&&selectedFac){
    
   changeGroup({
     id:selectedGroup,
     name:groupName,
     faculty:setSelectedFac
   })
   setIsopenedEdit(false)
  } 
  setSelectedFac("")
}

const canselHandler = (str)=>{
  if(groupName){
    setGroupName("")
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
                    {groupData&&groupData.map(group=>
                      <tr key= {group.id}>
                      <td className="group-id">{group.id}</td>
                      <td >{group.faculty}</td>
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
                    <Label ><strong>Faculty:</strong></Label>
                    <Col xs="18" md="15">
                      <Input type="select" name="select" id="select" placeholder={""} onChange = {(e)=>{setSelectedFac(e.target.value)}}>
                      <option hidden ></option>
=                        {facData.map((fac)=>{
                          return( <option key = {fac.id}value={`${fac.name}`} >{fac.name}</option>)
                        })}
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Label ><strong>Name:</strong></Label>
                    <Input type="text" id="name" name="name" value={groupName}  onChange={(e)=>{setGroupName(e.target.value)}} />
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
                Edit Group
              </CardHeader>
              <CardBody>
                <Form action="" >
                <FormGroup>
                    <Label ><strong>Name:</strong></Label>
                    <Col xs="18" md="15">
                      <Input type="select" name="select" id="select" placeholder={""} onChange = {(e)=>{setSelectedFac(e.target.value)}}>
                      <option hidden ></option>
=                        {facData.map((fac)=>{
                          return( <option key = {fac.id}value={`${fac.name}`} >{fac.name}</option>)
                        })}
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Label ><strong>Name</strong></Label>
                    <Input type="text" id="name" name="name" value = {groupName}  onChange={(e)=>{setGroupName(e.target.value)}} />
                  </FormGroup>             
                </Form>
              </CardBody>
              <Col col="6"  sm="4" md="2" xl  className="mb-4 mb-xl-2 d-flex justify-content-end pr-4" >
                <Button  color="success"  className = "mr-2" onClick = {editGroup}>Save</Button>
                <Button  color="danger" onClick = {()=>{
                  canselHandler("isopenedEdit")
                }}>Cancel</Button>
              </Col>
            </Card>}
    </div>
    
  );
}
const mapDispatchToProps = { 
  addGroup:groupOperations.addGroup,
  changeGroup:groupOperations.editGroup,
  deletGroup:groupOperations.deletGroup,
 }
 const mapStateToProps = (state ) => {
  return {
    groupData: state.GroupData.data,
    facData: state.FacData.data 
   }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Groups)
