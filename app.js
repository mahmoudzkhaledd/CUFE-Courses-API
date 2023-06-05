require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3005;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



/* importing auth functions */
const { checkAuth, checkAdminAuth, checkSuperAdminAuth } = require('./checkAuth/auth')


/* importing every kind of user routes ( normal user, admin, super admin ) and courses routes  */
const authRoutes = require('./Routes/AuthRoutes/AuthRoutes');
const userRoute = require('./Routes/UserRoutes/User');
const adminRoute = require('./Routes/AdminRoutes/AdminRoutes');
const coursesRoute = require('./Routes/UserRoutes/Courses');
const superAdminRoute = require('./Routes/SuperADmin/SuperAdminRoutes');



/* user dont need any kind of check auth in login and signup */ 
app.use(authRoutes);
app.use(userRoute);
app.use(coursesRoute);
/* check if user is logged in before see the courses */
//app.use('/courses', checkAuth);


/* only admins or super admins can access and edit or add courses */
app.use('/admin', checkAdminAuth);
app.use(adminRoute);


/* only super admin can add or delete or edit admin or normal user */
app.use('/super-admin', checkSuperAdminAuth);
app.use(superAdminRoute);


/* setting up mongoose and connect the database */
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Connected to port ${PORT}`))
}).catch(e => console.log(e));