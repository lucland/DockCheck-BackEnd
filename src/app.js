const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.prod' });
} else {
  dotenv.config({ path: '.env.dev' });
}

const express = require('express');
const sequelize = require('./config/database'); // Import Sequelize instance

// Initialize models
const User = require('./models/User');
const Authorization = require('./models/Authorization');
const Company = require('./models/Company');
const Supervisor = require('./models/Supervisor');
const Login = require('./models/Login');
const Event = require('./models/Event');
const Vessel = require('./models/Vessel');
const Docking = require('./models/Docking');
const Portal = require('./models/Portal');

// Initialize routes
const userRoutes = require('./routes/userRoutes');
const authorizationRouter = require('./routes/authorizationRouter');
const companyRoutes = require('./routes/companyRouter');
const dockingRoutes = require('./routes/dockingRouter');
const portalRoutes = require('./routes/portalRouter');
const vesselRoutes = require('./routes/vesselRouter');
const eventRoutes = require('./routes/eventRouter');
const supervisorRoutes = require('./routes/supervisorRouter');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger');
const syncRouter = require('./routes/syncRouter');
const loginRouter = require('./routes/loginRouter');

// Initialize Sequelize models
User.init(sequelize);
Authorization.init(sequelize);
Company.init(sequelize);
Supervisor.init(sequelize);
Event.init(sequelize);
Vessel.init(sequelize);
Docking.init(sequelize);
Portal.init(sequelize);
Login.init(sequelize);

// Define relationships
User.hasMany(Authorization, {
  foreignKey: 'user_id',
  as: 'authorizations'
});

Authorization.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

// Initialize Express and middleware
const app = express();
const rateLimit = require("express-rate-limit");

const syncLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10
});

app.use("/sync", syncLimiter);
app.use(express.json());

app.get('/', (req, res) => {
  res.redirect('/api/v1/api-docs');
});

// Define routes
app.use('/api/v1/', require('./routes'));
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/authorizations', authorizationRouter);
app.use('/api/v1/companies', companyRoutes);
app.use('/api/v1/docking', dockingRoutes);
app.use('/api/v1/portal', portalRoutes);
app.use('/api/v1/vessel', vesselRoutes);
app.use('/api/v1/event', eventRoutes);
app.use('/api/v1/supervisor', supervisorRoutes);
app.use('/api/v1/sync', syncRouter);
app.use('/api/v1/login', loginRouter);
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/*
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
*/
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});