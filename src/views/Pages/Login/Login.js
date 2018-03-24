import React, {Component} from 'react';
import _ from 'lodash';
import { Redirect } from 'react-router-dom';
import {Container, Row, Col, CardGroup, Card, CardBody, Button, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import {Alert} from "reactstrap";
import {Link} from "react-router-dom";
import { connect } from 'react-redux';
import {loginUser} from "./actions";

class Login extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  
  handleFormChange(e) {
    if (e && e.preventDefault) e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  
  handleManualLogin(e) {
    if (e && e.preventDefault) e.preventDefault();
    let {email, password} = this.state;
    this.props.loginUser(email,password);
  }
  
  render() {
    if(this.props.isLoggedIn) {
      return <Redirect to="/dashboard"/>
    }
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    {
                      (this.props.loading) &&
                      (
                        <Alert color="info">
                          Processing Login...
                        </Alert>
                      )
                    }
                    {
                      (!this.props.loading && _.get(this.props, "errMsg", "") !== "") &&
                      (
                        <Alert color="danger">
                          {this.props.errMsg}
                        </Alert>
                      )
                    }
                    <form onSubmit={e => this.handleManualLogin(e)}>
                      <h1 className="text-center">Login</h1>
                      <p className="text-muted">Sign In to your account</p>
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
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"/>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          name="password"
                          placeholder="Password"
                          required={true}
                          value={this.state.password}
                          onChange={e => this.handleFormChange(e)}
                        />
                      </InputGroup>
                      <Row className="align-items-center">
                        <Col xs="6">
                          <Link to="/forgot-password" color="link" className="px-0">Forgot password?</Link>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="primary" className="px-5">{this.state.loading ? "Logging In..." : "Login"}</Button>
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


const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isAuthenticated,
    loading: state.auth.isFetching,
    errMsg: state.auth.errorMessage
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (email, password) => dispatch(loginUser(email, password)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
