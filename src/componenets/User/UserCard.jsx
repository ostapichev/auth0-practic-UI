import { Image, Stack } from 'react-bootstrap';

export const UserCard = ({ user }) => {
    if (!user) return null;

    return (
        <>
            <h5>User data</h5>
            <Stack direction="horizontal" gap={3} className="mb-3">
                {user.picture && (
                    <Image
                        src={user.picture}
                        alt={user.name}
                        roundedCircle
                        width={64}
                        height={64}
                    />
                )}
                <div>
                    <div className="fw-bold">{user.name}</div>
                    <div className="text-muted">{user.email}</div>
                </div>
            </Stack>
            <pre className="bg-light p-3 rounded border text-start">
                {JSON.stringify(user, null, 2)}
            </pre>
        </>
    );
};
