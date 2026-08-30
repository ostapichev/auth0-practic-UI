import { Alert } from 'react-bootstrap';
import { ExclamationTriangleFill } from 'react-bootstrap-icons';

export const ApiResult = ({ result, error }) => {
    if (!result && !error) return null;

    return (
        <>
            {error && (
                <Alert variant="danger" className="d-flex align-items-center gap-2">
                    <ExclamationTriangleFill />
                    <span>Error: {error}</span>
                </Alert>
            )}

            {result && (
                <div className="mb-4">
                        <h5>Response API</h5>
                    <pre className="bg-light p-3 rounded border text-start">
                        {JSON.stringify(result, null, 2)}
                    </pre>
                </div>
            )}
        </>
    );
};
