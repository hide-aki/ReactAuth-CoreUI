import React, {Component} from 'react';
import {Container, Row, Col, CardGroup, Card, CardBody, Button, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import {doPasswordReset, doSignInWithEmailAndPassword} from "../../../components/Firebase/auth";
import {Alert} from "reactstrap";
import {Link} from "react-router-dom";

class ForgotPassword extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      loading: false,
      errMsg: "",
      successMsg: ""
    };
  }
  
  handleFormChange(e) {
    if (e && e.preventDefault) e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  
  handleSubmit(e) {
    if (e && e.preventDefault) e.preventDefault();
    if(this.state.loading) return ;
    let {email} = this.state;
    this.setState({
      loading: true,
      errMsg: "",
      successMsg: ""
    });
    doPasswordReset(email)
      .then(() => {
        this.setState({
          loading: false,
          successMsg: "Password reset link has been successfully sent to your email."
        });
      })
      .catch(error => {
        console.log("Error:", error);
        this.setState({
          loading: false,
          errMsg: error.message
        });
      });
  }
  
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    {
                      (this.state.loading) &&
                      (
                        <Alert color="info">
                          Processing Login...
                        </Alert>
                      )
                    }
                    {
                      (!this.state.loading && this.state.errMsg !== "") &&
                      (
                        <Alert color="danger">
                          {this.state.errMsg}
                        </Alert>
                      )
                    }
                    {
                      (!this.state.loading && this.state.successMsg !== "") &&
                      (
                        <Alert color="success">
                          {this.state.successMsg}
                        </Alert>
                      )
                    }
                    <form onSubmit={e => this.handleSubmit(e)}>
                      <h1 className="text-center">Forgot Password</h1>
                      <p className="text-muted">Enter your email to reset password</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"/>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="email"
                          name="email"
                          placeholder="Email"
                          required={true}
                          value={this.state.email}
                          onChange={e => this.handleFormChange(e)}
                        />
                      </InputGroup>
                      <Row className="align-items-center">
                        <Col xs="6">
                          <Link to="/login" color="link" className="px-0"><i className="fa fa-long-arrow-left"/> Back to Login</Link>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="primary" className="px-5">Reset My Password</Button>
                        </Col>
                      </Row>
                    </form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ForgotPassword;
