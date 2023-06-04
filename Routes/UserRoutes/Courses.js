const appRoute = require('express').Router();
const { getAllCourses, getCoursesCount, searchCourse,getCourseBtId } = require('../../controllers/CoursesController');

appRoute.get('/courses-count', getCoursesCount);

appRoute.get('/courses/:page', getAllCourses);
appRoute.get('/find-course/:id', getCourseBtId);

appRoute.get('/search-course/:key', searchCourse);

module.exports = appRoute;