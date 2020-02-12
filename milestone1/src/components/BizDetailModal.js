import React, { useState, Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

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
            {console.log(this.props.modal)}
            <Modal isOpen={this.props.modal} toggle={this.toggle.bind(this)}>
                <ModalHeader >Modal title</ModalHeader>
                <ModalBody>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.toggle.bind(this)}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
        );
    }
  }
  
  export default ModalExample;