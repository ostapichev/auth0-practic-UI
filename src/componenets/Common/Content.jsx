import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { Card, Badge } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';

import { auth0Service } from '../../services';
import { ApiButtons, ApiResult, AuthButtons, UserCard } from '../User';
import { LoadingScreen } from './LogingScreen';

export const Content = () => {
    const {
        getAccessTokenSilently,
        loginWithPopup,
        loginWithRedirect,
        logout,
        user,
        isAuthenticated,
        isLoading,
    } = useAuth0();

    const [apiResult, setApiResult] = useState(null);
    const [apiError, setApiError] = useState(null);
    const [loadingApi, setLoadingApi] = useState(false);

    const getTestAPI = async () => {
        setLoadingApi(true);
        setApiError(null);

        try {
            const response = await auth0Service.getTestAPI();
            setApiResult(response.data);
        } catch (error) {
            setApiError(error.message);
        } finally {
            setLoadingApi(false);
        }
    };

    const getUserInfo = async () => {
        setLoadingApi(true);
        setApiError(null);
        try {
            const token = await getAccessTokenSilently();
            const response = await auth0Service.getUserInfo(token);
            setApiResult(response.data);
        } catch (error) {
            setApiError(error.message);
        } finally {
            setLoadingApi(false);
        }
    };

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <Card.Title as="h1" className="h3 mb-0">
                    Auth0 Authentication
                </Card.Title>
                <Badge
                    bg={isAuthenticated ? 'success' : 'secondary'}
                    className="d-flex align-items-center gap-1"
                >
                    <PersonCircle />
                    {isAuthenticated ? 'Logged in' : 'Not logged in'}
                </Badge>
            </div>

            <AuthButtons
                isAuthenticated={isAuthenticated}
                onLoginPopup={() => loginWithPopup()}
                onLoginRedirect={() => loginWithRedirect()}
                onLogout={() => logout()}
            />

            <hr />

            <ApiButtons
                isAuthenticated={isAuthenticated}
                loading={loadingApi}
                onCallPublic={getTestAPI}
                onCallProtected={getUserInfo}
            />

            <ApiResult result={apiResult} error={apiError} />
            {isAuthenticated && <UserCard user={user} />}
        </Card.Body>
    )
}
