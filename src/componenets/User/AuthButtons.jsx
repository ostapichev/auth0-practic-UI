import { Row, Col, Button } from 'react-bootstrap';
import { BoxArrowInRight, ArrowRightCircle, BoxArrowRight } from 'react-bootstrap-icons';

export const AuthButtons = ({ isAuthenticated, onLoginPopup, onLoginRedirect, onLogout }) => (
    <Row className="g-3 mb-4">
        <Col xs={12} md={4}>
            <Button
                variant="primary"
                className="w-100 d-flex align-items-center justify-content-center gap-2"
                onClick={onLoginPopup}
                disabled={isAuthenticated}
            >
                <BoxArrowInRight />
                Login with popup
            </Button>
        </Col>
        <Col xs={12} md={4}>
            <Button
                variant="outline-primary"
                className="w-100 d-flex align-items-center justify-content-center gap-2"
                onClick={onLoginRedirect}
                disabled={isAuthenticated}
            >
                <ArrowRightCircle />
                Login with redirect
            </Button>
        </Col>
        <Col xs={12} md={4}>
            <Button
                variant="outline-danger"
                className="w-100 d-flex align-items-center justify-content-center gap-2"
                onClick={onLogout}
                disabled={!isAuthenticated}
            >
                <BoxArrowRight />
                Logout
            </Button>
        </Col>
    </Row>
);
