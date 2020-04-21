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
                            <br />
                        <Row>
                            <Col>
                                <Label style={{fontWeight: 'bold'}}> Number of business in the same state: </Label>
                            </Col>
                            <Col>
                                {this.props.biz_count.numSameState}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Label style={{fontWeight: 'bold'}}> Number of business in the same city: </Label>
                            </Col>
                            <Col>
                                {this.props.biz_count.numSameCity}
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