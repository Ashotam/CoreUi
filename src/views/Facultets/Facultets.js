import React, {useState } from 'react';
import {  Card, CardBody, CardHeader, Col, Row, Table,Button,Form,
  FormGroup,FormFeedback,Input,Label,} from 'reactstrap';
import './Facultet.css';
import { connect } from 'react-redux'
import {facultyOperations} from "../../states/ducks/Faculty"

function Facultets(props) {
console.log(props)
const {facData,addFaculty,changeFaculty,deletFaculty}= props

const[isOpenedCreate,setIsOpenCreate]=useState(false);
const[isopenedEdit,setIsopenedEdit]=useState(false);
const [facultyName,setFacultyName]= useState("");
const [selectedFac,setSelectidFac]= useState(0)
const openCreateFaculty = ()=>{
  setIsOpenCreate(!isOpenedCreate)
}
const addFaculti = ()=>{
  if(facultyName){
    let nextId =facData.length+1;
   
    let newFac = {
      id:nextId,
      name:facultyName
    }
    addFaculty(newFac)
    setIsOpenCreate(false);
    setFacultyName("")
  }
  
}
const editHandler = (id)=>{
  setIsopenedEdit(!isopenedEdit)
  setSelectidFac(id)
  setFacultyName(facData[id-1].name)

}
const delateHandler = (id)=>{
  deletFaculty(id)
}
const editFaculty = ()=>{
  if(facultyName!==facData[selectedFac-1].name){
   changeFaculty({
     id:selectedFac,
     name:facultyName
   })
   setIsopenedEdit(false)
  } 
}
const canselHandler = (str)=>{
  if(facultyName){
    setFacultyName("")
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
                 Faculty Table
              </CardHeader>
            
              <CardBody>
              <Col col="6"  sm="4" md="2" xl  className="mb-3 mb-xl-0 d-flex justify-content-end p-0" >
                <Button  color="success" onClick= {openCreateFaculty}>Create Faculty</Button>
              </Col>
                <Table responsive>
                  <thead>
                  <tr >
                    <th >id</th>
                    <th >Name</th>
                    <th >Actions</th>      
                  </tr>
                  </thead>
                  <tbody>
                    {facData&&facData.map(fac=>
                      <tr key= {fac.id}>
                      <td className="id">{fac.id}</td>
                      <td >{fac.name}</td>
                      <td className= "actions"> 
                       <span className="icons-span"><i className="fa fa-close fa-lg mt-2 red"  onClick={()=>{
                        delateHandler(fac.id)
                       }}></i>
                       <i  className="fa fa-edit fa-lg mt-2 green" onClick={()=>{
                        editHandler(fac.id)

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
                Edit Faculty
              </CardHeader>
              <CardBody>
                <Form action="" method="post">
                  <FormGroup>
                  {/* <Label htmlFor="inputIsInvalid">Input is invalid</Label>
                  <Input type="text" invalid id="inputIsInvalid" />
                  <FormFeedback>Houston, we have a problem...</FormFeedback> */}
                    <Label ><strong>Name</strong></Label>
                    <Input type="text" id="name" valid = {facultyName.length} invalid={facultyName.length==0} name="name" value={facultyName}  onChange={(e)=>{setFacultyName(e.target.value)}} />
                    <FormFeedback >Non-required</FormFeedback>
                  </FormGroup>
                 
                </Form>
              </CardBody>
              <Col col="6"  sm="4" md="2" xl  className="mb-4 mb-xl-2 d-flex justify-content-end pr-4" >
                <Button  color="success"  className = "mr-2" onClick = {addFaculti}>Save</Button>
                <Button  color="danger" onClick = {()=>{
                  canselHandler("isOpenedCreate")
                }}>Cancel</Button>
              </Col>
            </Card>}
            
            {isopenedEdit &&  <Card>
              <CardHeader>
                Edit Faculty
              </CardHeader>
              <CardBody>
                <Form action="" method="post">
                  <FormGroup>
                    <Label ><strong>Name</strong></Label>
                    <Input type="text" id="name" name="name" value = {facultyName} onChange={(e)=>{setFacultyName(e.target.value)}} /> 
                  </FormGroup>
                 
                </Form>
              </CardBody>
              <Col col="6"  sm="4" md="2" xl  className="mb-4 mb-xl-2 d-flex justify-content-end pr-4" >
                <Button  color="success"  className = "mr-2" onClick = {editFaculty}>Save</Button>
                <Button  color="danger" onClick = {()=>{
                  canselHandler("isopenedEdit")
                }}>Cancel</Button>
              </Col>
            </Card>}
    </div>
  );
}
const mapDispatchToProps = { 
  addFaculty:facultyOperations.addFaculty,
  changeFaculty:facultyOperations.editFaculty,
  deletFaculty:facultyOperations.deletFaculty,
 }
 const mapStateToProps = (state ) => {
  return {
    facData: state.FacData.data
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Facultets)


