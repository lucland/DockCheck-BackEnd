const dotenv = require('dotenv');
const db = require('./config/database');

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.prod' });
} else {
  dotenv.config({ path: '.env.dev' });
}

const cors = require('cors');
const https = require('https');
const fs = require('fs');
const express = require('express');
const sequelize = require('./config/database'); // Import Sequelize instance

// Initialize models
const User = require('./models/User');
const Authorization = require('./models/Authorization');
const Company = require('./models/Company');
const Login = require('./models/Login');
const Event = require('./models/Event');
const Vessel = require('./models/Vessel');
const Beacon = require('./models/Beacon');
const Area = require('./models/Area');
const Document = require('./models/Document');
const Employee = require('./models/Employee');
const Picture = require('./models/Picture');
const Project = require('./models/Project');
const Sensor = require('./models/Sensor');
const ThirdCompany = require('./models/ThirdCompany');
const ThirdProject = require('./models/ThirdProject');
const CompanyAdmin = require('./models/CompanyAdmin');
const CompanyProject = require('./models/CompanyProject');
const ProjectAdmin = require('./models/ProjectAdmin');
const ThirdCompanyAdmin = require('./models/ThirdCompanyAdmin');
const Invite = require('./models/Invite');

// Initialize routes
const userRoutes = require('./routes/userRoutes');
const authorizationRouter = require('./routes/authorizationRouter');
const companyRoutes = require('./routes/companyRouter');
const vesselRoutes = require('./routes/vesselRouter');
const dashboardRouter = require('./routes/dashboardRouter');
const eventRoutes = require('./routes/eventRouter');
const loginRouter = require('./routes/loginRouter');
const beaconRouter = require('./routes/beaconRouter');
const areaRouter = require('./routes/areaRouter');
const documentRouter = require('./routes/documentRouter');
const employeeRouter = require('./routes/employeeRouter');
const pictureRouter = require('./routes/pictureRouter');
const projectRouter = require('./routes/projectRouter');
const sensorRouter = require('./routes/sensorRouter');
const thirdCompanyRouter = require('./routes/thirdCompanyRouter');
const thirdProjectRouter = require('./routes/thirdProjectRouter');
const inviteRouter = require('./routes/inviteRouter');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger');

// Initialize Sequelize models
User.init(sequelize);
Authorization.init(sequelize);
Company.init(sequelize);
Event.init(sequelize);
Vessel.init(sequelize);
Login.init(sequelize);
Beacon.init(sequelize);
Area.init(sequelize);
Document.init(sequelize);
Employee.init(sequelize);
Picture.init(sequelize);
Project.init(sequelize);
Sensor.init(sequelize);
ThirdCompany.init(sequelize);
ThirdProject.init(sequelize);
CompanyAdmin.init(sequelize);
CompanyProject.init(sequelize);
ProjectAdmin.init(sequelize);
ThirdCompanyAdmin.init(sequelize);
Invite.init(sequelize);

// Initialize Express and middleware
const app = express();
const rateLimit = require("express-rate-limit");

const syncLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10
});

app.use("/sync", syncLimiter);
app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
  res.redirect('/api/v1/api-docs');
});

// Define routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/authorizations', authorizationRouter);
app.use('/api/v1/companies', companyRoutes);
app.use('/api/v1/vessels', vesselRoutes);
app.use('/api/v1/dashboard', dashboardRouter);
app.use('/api/v1/events', eventRoutes);
app.use('/api/v1/login', loginRouter);
app.use('/api/v1/beacons', beaconRouter);
app.use('/api/v1/areas', areaRouter);
app.use('/api/v1/documents', documentRouter);
app.use('/api/v1/employees', employeeRouter);
app.use('/api/v1/pictures', pictureRouter);
app.use('/api/v1/projects', projectRouter);
app.use('/api/v1/sensors', sensorRouter);
app.use('/api/v1/thirdCompanies', thirdCompanyRouter);
app.use('/api/v1/thirdProjects', thirdProjectRouter);
app.use('/api/v1/invites', inviteRouter);
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
const httpsServer = https.createServer({
  key:fs.readFileSync('./ssl/privkey.pem'),
  cert:fs.readFileSync('./ssl/fullchain.pem'),
},app)

/*
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
*/
//db.sync(() => console.log(`Banco de dados conectado: ${process.env.DB_NAME}`));

// Start the server
// const PORT = 80;
// const HOST = '192.168.0.100'; // Listen on all available network interfaces
// app.listen(PORT, HOST, () => {
//     console.log(`Server running on https://${HOST}:${PORT}/`);
// });

httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
});