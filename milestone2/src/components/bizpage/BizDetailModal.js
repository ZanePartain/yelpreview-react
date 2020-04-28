import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Label, Row, Col } from 'reactstrap';

class ModalExample extends Component {
    constructor(props){
        super(props);
        this.state={

        };
    }
  
    toggle = () => {
        this.props.setModal();
    }
  
    render(){
        return (
        <div>
            <Modal isOpen={this.props.modal} toggle={this.toggle.bind(this)}>
                <ModalHeader >{this.props.details.name} Details</ModalHeader>
                <ModalBody>
                    <Container>
                        <Row>
                            <Col>
                                <Label style={{fontWeight: 'bold'}}> Business Name </Label>
                            </Col>
                            <Col>
                                {this.props.details.name}
                            </Col>
                            
                        </Row>
                        <Row>
                            <Col>
                                <Label  style={{fontWeight: 'bold'}}> State </Label>
                            </Col>
                            <Col>
                                {this.props.details.state}
                            </Col>
                            
                        </Row>
                        <Row>
                            <Col>
                                <Label  style={{fontWeight: 'bold'}}> City </Label>
                            </Col>
                            <Col>
                                {this.props.details.city}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Label style={{fontWeight: 'bold'}}> Hours: </Label>
                            </Col>
                            <Col>
                                {JSON.stringify(this.props.hours)}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Label style={{fontWeight: 'bold'}}> Categories: </Label>
                                <Row>
                                    <div style={{width: '100%', height: '100px', overflowY: 'scroll'}}>
                                        <ul>
                                            {this.props.categories.map((item, key) => {
                                                return <li key={key}>{item}</li>
                                            })}
                                        
                                        </ul>
                                    </div>
                                </Row>
                            </Col>
                            <Col>
                            </Col>
                        </Row>
                    </Container>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.toggle.bind(this)}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
        );
    }
  }
  
  export default ModalExample;