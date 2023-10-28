const express = require('express');
const router = express.Router();
const SIGNUP = require("../Schema/userSchema")
const addEmp = require('../Schema/addEmplyeeSchema');
// const bcrypt= require("bcrypt");
const cookie = require("cookie-parser")
const tasks = require("../Schema/TaskSchema");


// send data to database
router.post("/adduser", async (req, res) => {
    const { fullname, username, email, password } = req.body;
    if (!fullname || !email || !username || !password) {
        res.status(422).json("plz fill data");
    }
    try {
        const preuser = await SIGNUP.findOne({ username: username });
        console.log(preuser);
        if (preuser) {
            res.status(422).json("this is user is already present");
        } else {
            const adduser = new SIGNUP({
                username, email, fullname, password
            });
            await adduser.save();
            res.status(201).json(adduser);
            console.log(adduser);
        }
    } catch (error) {
        res.status(422).json(error);
    }
})
// get user by id
router.get("/getuserbyid/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = await SIGNUP.findById({ _id: id });
        res.status(201).json(data);
    } catch (err) {
        res.status(422).json(err)
    }
});



//Login user
router.post("/login", async (req, res) => {
    try {
        console.log("login api is working");
        const { username, password } = req.body;
        const exitsUser = await SIGNUP.findOne({ username: username, password: password })

        console.log(exitsUser);

        if (exitsUser) {
            res.status(200).json({ success: true, message: "Admin Login successful" })

            newToken = await exitsUser.generateAuthToken();

            // res.cookie('jwt', newToken,{
            //     expires: new Date(Date.now() + 2592000000),
            //     httpOnly: true
            // })



        }
        else {
            console.log("USER login failed");
            res.status(422).json({ success: false })
        }
    } catch (error) {
        console.log(error);
    }
})


//add employees
router.post("/addemp", async (req, res) => {
    const { empId, empName, username, empEmail, empMobile, password } = req.body;
    if (!empId || !empName || !username || !empEmail || !empMobile || !password) {
        res.status(422).json("plz fill data");
    }
    try {
        const preEmp = await addEmp.findOne({ username: username, empId: empId });
        console.log(preEmp);
        if (preEmp) {
            res.status(422).json("this is user is already present");
        } else {
            const addemp = new addEmp({
                empId, empName, username, empEmail, empMobile, password
            });
            await addemp.save();
            res.status(201).json(addemp);
            console.log(addemp);
        }
    } catch (error) {
        res.status(422).json(error);
    }
});

//get all emplyoees details
router.get("/getEmp", async (req, res) => {
    try {
        const data = await addEmp.find();
        res.status(201).json(data);
    } catch (err) {
        res.status(422).json(err)
    }
});
//get one  employee detalis by Id
router.get("/getEmpid/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const data = await addEmp.findOne({ _id: id });
        res.status(201).json(data);
    } catch (err) {
        res.status(422).json(err);
    }
});
//delete one employee by Id

router.delete("deleteEmp/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const del = await addEmp.findByIdAndDelete({ _id: id })
        res.status(201).json(del);
    } catch (err) {
        res.status(422).json(err);
    }
});

//update employee data

router.put("/updateEmp/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const edit = await addEmp.findByIdAndUpdate(id, req.body, { new: true })
        res.status(201).json(edit);

    } catch (err) {
        res.status(422).json(err);
    }
});
//empLogin by one
router.post("/empLogin", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await addEmp.findOne({ username: username, password: password });
        console.log(user);
        // const isPasswordValid = await bcrypt.compare(password, user.password);
        // console.log(isPasswordValid);
        if (!user) {
            console.log("USER login failed");
            res.status(422).json({ success: false })
        }
        else {
            res.status(200).json({ success: true })
            console.log("USER login");
        }
    } catch (error) {
        console.log(error);
    }
});

//add task to employee


// router.post("/addtask", async (req, res) => {
//     const { projectName, taskName, assignee, empId, startDate, endDate, description } = req.body;
//     if (!projectName || !taskName || !assignee || !empId || !startDate || !endDate || !description) {
//         res.status(422).json("please fill data");
//     }
//     try {
//         const preTask = await tasks.findOne({ taskName: taskName });
//         if (preTask) {
//             res.status(422).json("this task is already is present");
//         }
//         else {
//             const addTask = new tasks({
//                 projectName, taskName, assignee, empId, startDate, endDate, description
//             });
//             await addTask.save();
//             res.status(200).json("add successfully");
//             console.log(addTask)

//         }
//     } catch (err) {
//         res.status(422).json("error");

//     }
// })
router.post("/addtask", async (req, res) => {
    const { projectName, taskName, assignee, empId, startDate, endDate, description} = req.body;
    if (!projectName || !taskName || !assignee || !empId || !startDate || !endDate || !description ) {
        return res.status(422).send({ error: "Plz fill the data" });
    }
    try {
        const preTask = await tasks.findOne({ taskName: taskName });


        if (preTask) {
            res.status(422).json("this task is already is present");
        }
        else {
            const addTask = new tasks({
                projectName, taskName, assignee, empId, startDate, endDate, description
            });
            await addTask.save();
            res.status(200).json("add successfully");
            console.log(addTask)
        }
    } catch (err) {
        console.log(err);
    }
})


router.get("/gettask", async (req, res) => {
    try {
        const response = await tasks.find();
        res.status(201).json(response);
    } catch (err) {
        res.status(422).json(err)
    }
});

router.delete("/deletetask/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const del = await tasks.findByIdAndDelete({ _id: id })
        res.status(201).json(del);
    } catch (err) {
        res.status(422).json(err);
    }
})


router.get("/singletask/:id", async(req,res)=>{
    const value = req.params.id
    // console.log(value);
    try {

        const  result = await tasks.findById({_id:value})
        res.status(200).json({success:true, result})
    } catch (error) {
        
    }
})

router.put("/updatetask/:id" , async(req, res)=>{
    const value = req.params.id
    // console.log(value);

    try {

        const  result = await tasks.findOneAndUpdate({_id:value}, req.body.addData)
        console.log(result);
        res.status(200).json({success:true, result})
    } catch (error) {
        console.log(error);
        
    }

})



module.exports = router;