import './loadEnv.js';
import app from './app.js';
import { port } from './utils/constants.js';

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});