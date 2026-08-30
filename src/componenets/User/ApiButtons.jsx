import { Row, Col, Button, Spinner } from 'react-bootstrap';
import { CloudArrowDown, ShieldLock } from 'react-bootstrap-icons';

export const ApiButtons = ({ isAuthenticated, loading, onCallPublic, onCallProtected }) => (
    <Row className="g-3 mb-4">
        <Col xs={12} md={6}>
            <Button
                variant="secondary"
                className="w-100 d-flex align-items-center justify-content-center gap-2"
                onClick={onCallPublic}
                disabled={loading}
            >
                {loading ? <Spinner animation="border" size="sm" /> : <CloudArrowDown />}
                Call API route
            </Button>
        </Col>
        <Col xs={12} md={6}>
            <Button
                variant="secondary"
                className="w-100 d-flex align-items-center justify-content-center gap-2"
                onClick={onCallProtected}
                disabled={loading || !isAuthenticated}
            >
                {loading ? <Spinner animation="border" size="sm" /> : <ShieldLock />}
                Call API protected route
            </Button>
        </Col>
    </Row>
);
