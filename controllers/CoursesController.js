const Course = require('../models/Course');


async function addCourse(req, res) {
    console.log(req.body);
    try {
        const courses = req.body;
        for (let i = 0; i < courses.length; i++) {
            const {
                code,
                name,
                description,
                creditHours,
                isElective,
                isFall,
                isSpring,
                isSummer,
                preRequisites,
                departments,
            } = courses[i];
            
            if (code == null || name == null || description == null || creditHours == null || isElective == null || isFall == null || preRequisites == null || departments == null || isSpring == null|| isSummer == null)
                return res.status(400).json({ message: "please enter full data" });
            const tmpCourse = await Course.findOne({ "$or": [{ name }, { code }] });
            if (tmpCourse) {
                if (tmpCourse.name == name) {
                    return res.status(400).json({ message: `There are another course with same name = "${name}", try to change it` });
                } else if (tmpCourse.code == code) {
                    return res.status(400).json({ message: `There are another course with same code = "${code}", try to change it` });
                } else if (tmpCourse.name == name && tmpCourse.code == code) {
                    return res.status(400).json({ message: `There are another course with same name = "${name}" and code = "${code}", try to edit them` });
                }
            }
        }


        await Course.insertMany(req.body);
        res.status(200).json({ message: 'success' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

async function editCourse(req, res) {
    try {
        const id = req.params.id;

        const {
            code,
            name,
            description,
            creditHours,
            isElective,
            isFall,
            isSpring,
            isSummer,
            preRequisites,
            department,
        } = req.body;

        const course = await Course.findById(id);

        if (!course) return res.status(400).json({ message: "The course not found" });

        if (code != null || name != null) {
            const tmpCourse = await Course.findOne({
                "$and": [
                    { "$or": [{ code: code }, { name: name }] },
                    { _id: { "$ne": course._id } },
                ]
            });

            if (tmpCourse && tmpCourse.code == code) return res.status(400).json({ message: "Theis code is already taken" });
            else if (code != null)
                course.code = code;
            if (tmpCourse && tmpCourse.name == name) return res.status(400).json({ message: "Theis name already taken" });
            else if (name != null)
                course.name = name;
        }

        if (description) course.description = description;
        if (creditHours) course.creditHours = creditHours;
        if (isElective) course.isElective = isElective;
        if (isFall) course.isFall = isFall;
        if (isSummer) course.isSummer = isSummer;
        if (isSpring) course.isFall = isSpring;
        if (preRequisites) course.preRequisites = preRequisites;
        if (department) course.department = department;

        const saved = await course.save();
        return res.status(200).json(saved);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function deleteCourse(req, res) {
    try {
        const id = req.params.id;
        await Course.findByIdAndDelete(id);
        return res.status(200).json({ message: "Success" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

async function getAllCourses(req, res) {
    const page = req.params.page || 0, limit = 20;
    
    try {
        const courses = await Course.find().skip(limit * page).limit(limit);
        const count = await Course.count();
        
        return res.status(200).json({count,courses});
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}
async function countCourses() {
    try {
        const count = await Course.find().count();
        return count;
    } catch (err) {
        return 0;
    }
}
async function getCoursesCount(req, res) {
    try {
        const count = await Course.find().count();
        return res.status(200).json({ count });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}
async function searchCourse(req, res) {
    try {
        const key = req.params.key;

        const courses = await Course.find({
            "$or": [
                { name: { "$regex": key } },
                { code: { "$regex": key } },
            ]
        },{_id:1,code:1,name:1});
        return res.status(200).json(courses);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}
async function getCourseBtId(req, res) {
    const id = req.params.id;

    try {
        const course = await Course.findById(id);
        if(course != null)
            return res.status(200).json(course);
        else 
            return res.status(400).json({message:"Sorry, The course is not found"});
    } catch (err) {
        return res.status(400).json({message:err.message});
    }
}
module.exports = { addCourse, editCourse, deleteCourse, getAllCourses, getCoursesCount, countCourses, searchCourse, getCourseBtId };