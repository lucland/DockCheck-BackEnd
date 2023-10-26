const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.prod' });
} else {
  dotenv.config({ path: '.env.dev' });
}

const express = require('express');
const { Sequelize } = require('sequelize');
const dbConfig = require('./config/database');
const User = require('./models/User');
const Authorization = require('./models/Authorization');
const Company = require('./models/Company');  // Import the Company model
const Supervisor = require('./models/Supervisor');  // Import the Supervisor model
const Event = require('./models/Event');  // Import the Event model
const Vessel = require('./models/Vessel');  // Import the Vessel model
const Docking = require('./models/Docking');  // Import the Docking model
const Portal = require('./models/Portal');  // Import the Portal model
const userRoutes = require('./routes/userRoutes'); // Import the user routes
const companyRoutes = require('./routes/companyRouter'); // Import the company routes
const dockingRoutes = require('./routes/dockingRouter'); // Import the docking routes
const portalRoutes = require('./routes/portalRouter'); // Import the portal routes
const vesselRoutes = require('./routes/vesselRouter'); // Import the vessel routes
const eventRoutes = require('./routes/eventRouter'); // Import the event routes
const supervisorRoutes = require('./routes/supervisorRouter'); // Import the supervisor routes
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger');  // Import the Swagger configuration
const syncRouter = require('./routes/syncRouter'); // Import the sync routes
const loginRouter = require('./routes/loginRouter'); // Import the login routes
const admin = require('./firebase');  // adjust the path as needed

// Initialize Sequelize
const sequelize = new Sequelize(dbConfig);
sequelize.sync({ force: true })  // This will delete all tables and re-create them

// Initialize models
User.init(sequelize);
Authorization.init(sequelize);
Company.init(sequelize);  // Initialize the Company model
Supervisor.init(sequelize);  // Initialize the Supervisor model
Event.init(sequelize);  // Initialize the Event model
Vessel.init(sequelize);  // Initialize the Vessel model
Docking.init(sequelize);  // Initialize the Docking model
Portal.init(sequelize);  // Initialize the Portal model

User.hasMany(Authorization, {
  foreignKey: 'user_id',
  as: 'authorizations'
});

Authorization.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

const app = express();
const routes = require('./routes');

const rateLimit = require("express-rate-limit");

const syncLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10 // limit each IP to 10 requests per windowMs
});

app.use("/sync", syncLimiter);


app.use(express.json());
app.use('/', routes);
app.use('/users', userRoutes);  // Use the user routes for any requests that start with "/users"
app.use('/companies', companyRoutes);  // Use the company routes for any requests that start with "/companies"
app.use('/docking', dockingRoutes);  // Use the docking routes for any requests that start with "/docking"
app.use('/portal', portalRoutes);  // Use the portal routes for any requests that start with "/portal"
app.use('/vessel', vesselRoutes);  // Use the vessel routes for any requests that start with "/vessel"
app.use('/event', eventRoutes);  // Use the event routes for any requests that start with "/event"
app.use('/supervisor', supervisorRoutes);  // Use the supervisor routes for any requests that start with "/supervisor"
app.use('/sync', syncRouter);  // Use the sync routes for any requests that start with "/sync"
app.use('/login', loginRouter);  // Use the login routes for any requests that start with "/login"
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
