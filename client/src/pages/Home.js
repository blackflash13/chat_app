import React from "react";
import {Row, Col, Button} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import "./Home.css";
import {useSelector} from "react-redux";

function Home() {
    return (
        <Row>
            <Col md={12} className="d-flex vw-100 vh-100 align-items-center justify-content-center">
                <div>
                    <LinkContainer to="/chat">
                        <Button variant="success">
                            Let's GO! <i className="fas fa-comments home-message-icon"></i>
                        </Button>
                    </LinkContainer>
                </div>
            </Col>
        </Row>
    );
}

export default Home;
