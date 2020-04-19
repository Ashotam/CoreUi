import React, {useState } from 'react';
import {  Card, CardBody, CardHeader, Col, Row, Table,Button} from 'reactstrap';
import './Facultet.css';
import { connect } from 'react-redux';
import {facultyOperations} from "../../states/ducks/Faculty";
import Forms from "../Forms/FacultyForm"
import Modal from "../Modals/Modals";
import shortId from "shortid"
function Facultets(props) {
const {facData,addFaculty,changeFaculty,deletFaculty}= props
const[isOpenedCreate,setIsOpenCreate]=useState(false);
const[isopenedEdit,setIsopenedEdit]=useState(false);
const [facultyName,setFacultyName]= useState("");
const [selectedFac,setSelectedFac]= useState("");
const [error,setError]= useState(
  {
    facultyNameError:false,
    facultyNameErrorText:"Name must be at least 4 characters",
  }
)
const [isOpenModal,setIsOpenModal]= useState(false)
const openCreateFaculty = ()=>{
  setIsOpenCreate(!isOpenedCreate)
}
const addFaculti = ()=>{
  if(facultyName.length>3){

   
    let newFac = {
      id:shortId.generate(),
      name:facultyName,
      groups:[]
    }
    addFaculty(newFac)
    setIsOpenCreate(false);
    setFacultyName("");
    setError({...error,facultyNameError:false})
  }
  else {
  setError({...error,facultyNameError: true});
}
  }
 const changeHandler = (e)=>{
  setFacultyName(e.target.value)
  }
const editHandler = (id)=>{
  setIsopenedEdit(!isopenedEdit)
  const name = facData.find(fac=>fac.id ==id).name
  setSelectedFac(id)
   setFacultyName(name)
}
const delateHandler = (id)=>{
  let deletedFac = facData.find(fac=>fac.id===id)
 if(deletedFac.groups.length===0){
  if(facData)
  setSelectedFac(id)
  setIsOpenModal(true)
 }
  else { return/* notifaciton dnel*/ }
}
const onDelete = ()=>{
  deletFaculty(selectedFac)
  setIsOpenModal(false)
}
const editFaculty = ()=>{
  if(facultyName.length>3){
    console.log(facultyName,"vram")
   changeFaculty({
     id:selectedFac,
     name:facultyName
   })
   setIsopenedEdit(false)
   setError({...error,facultyNameError:false})
   setFacultyName("");
  } 
  else {
    setError({...error,facultyNameError: true});
  }
}
const canselHandler = (str)=>{
  if(facultyName){
    setFacultyName("")
  }
  else 
  str === "isopenedEdit"?setIsopenedEdit(false):setIsOpenCreate(false)
  setError({...error,facultyNameError:false})
}

  return (
    <div>
      {!isOpenedCreate &&!isopenedEdit &&(
      <Row>
        <Modal isOpen = {isOpenModal} deletedData={"Faculty"} onDelete={onDelete} onCansel ={()=>{
                          setIsOpenModal(false)
                       }}/>
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
                      <td className="id">{fac.id.slice(0,3)}</td>
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
    {isOpenedCreate &&  <Forms data = {{facultyName:facultyName}} error={error} name="Faculty" type = {"Add"} onChange={changeHandler} onSave={addFaculti} onCansel = {canselHandler}/>}        
    {isopenedEdit && <Forms data = {{facultyName:facultyName}} error={error} name="Faculty" type = {"Edit"} onChange={changeHandler} onSave={editFaculty} onCansel = {canselHandler}/>}
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


