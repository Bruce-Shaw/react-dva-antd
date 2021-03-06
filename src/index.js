import dva from 'dva';
import 'moment/locale/zh-cn';
import './index.css';
// 1. Initialize
// const app = dva();
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);
app.model(require('./models/global').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
