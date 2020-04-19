import React from 'react';
import {Card, CardBody, CardHeader, Col,Button,Form,
    FormGroup,FormFeedback,Input,Label,} from 'reactstrap';

function Forms(props){
  const {data,error,name,type,onChange,onSave,onCansel} = props
    return (
      <div >
                <Card>
              <CardHeader>
                {`${type} ${name}`}
              </CardHeader>
              <CardBody>
                <Form action="" method="post">
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
                    <Label ><strong>Name</strong></Label>
                    <Input type="text" id="name"  invalid={data.facultyName.length<4&&error.facultyNameError} name="name" value={data.facultyName}  onChange={(e)=>{onChange(e.target.value)}} />
                    <FormFeedback>{error.facultyNameErrorText}</FormFeedback> 
                  </FormGroup>
                </Form>
              </CardBody>
              <Col col="6"  sm="4" md="2" xl  className="mb-4 mb-xl-2 d-flex justify-content-end pr-4" >        
                <Button  color="danger" className = "mr-2" onClick = {()=>{             
                        type ==="Add" ?onCansel("isOpenedCreate"):onCansel("isopenedEdit")   
                }}>Cancel</Button>
                 <Button  color="success"  onClick = {onSave}>Save</Button>
              </Col>
            </Card>
      </div>
    );
    }


export default Forms;