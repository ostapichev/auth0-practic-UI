import { Container, Card } from 'react-bootstrap';

import { Content } from './componenets';

const App = () => (
    <Container className="py-5">
        <Card className="shadow-sm">
            <Content />
        </Card>
    </Container>
);

export default App;
