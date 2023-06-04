const appRoute = require('express').Router();
const { addAdmin,
    deleteAdmin,
    updateUser,
    getAllAdmins,
    getAllUsers,
    getUser,
    getDiskSpace,
    getAdminCount,
    getUsersCount,
    getAppSummary,
} = require('../../controllers/superAdmin');


appRoute.post('/super-admin/add-admin', addAdmin);

appRoute.patch('/super-admin/update-user/:id', updateUser);

appRoute.delete('/super-admin/delete-user/:id', deleteAdmin);

appRoute.get('/super-admin/all-admins', getAllAdmins);

appRoute.get('/super-admin/all-users', getAllUsers);

appRoute.get('/super-admin/users/:id', getUser);

appRoute.get('/super-admin/disk-space', getDiskSpace);

appRoute.get('/super-admin/admins-count', getAdminCount);

appRoute.get('/super-admin/users-count', getUsersCount);

appRoute.get('/super-admin/app-summary', getAppSummary);






module.exports = appRoute;