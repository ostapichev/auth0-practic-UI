import { Spinner } from 'react-bootstrap';

export const LoadingScreen = () => (
    <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    </div>
);
