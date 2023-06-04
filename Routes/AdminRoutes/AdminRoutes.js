const appRoute = require('express').Router();
const { addCourse, editCourse, deleteCourse } = require('../../controllers/CoursesController')



appRoute.get('/admin/departments', (req,res)=>{
    const departments = [
        "CCE",
        "CCE-E",
        "CCE-C",
        "EEE",
        "HEM",
        "CEM",
        "STE",
        "WEE",
        "AET",
        "PPC",
        "MDE",
        "CIE",
        "AEM",
        "MEE",
        "IEM",
        "MEM",
        "SEE",
    ];
    res.status(200).json(departments);
});


appRoute.post('/admin/add-courses', addCourse);

appRoute.patch('/admin/update/:id', editCourse);

appRoute.delete('/admin/delete/:id', deleteCourse);







module.exports = appRoute;