const notesmodel = require("../modal/notes")
const usermodel = require("../modal/user")
const TOKEN_KEY = "hellodeveloperforreactjsapp";
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');

module.exports.createNotes = async (req, res) => {
    try {
        const { token } = req.headers;
        const { item, id, completed } = req.body;
        const findUser = await usermodel.findOne({ token })
        let userData = await notesmodel.create({
            title: item,
            id: id,
            completed: completed,
            useref_id: findUser?._id
        })
        res.send({ findUser: userData, message: "added successfully" })

    } catch (error) {
        console.log(error)
    }

}

module.exports.listNotes = async (req, res) => {
    try {
        const { token } = req.headers
        const user = await usermodel.findOne({ token })
        const data = await notesmodel.find({ useref_id: user?._id })
        res.send({ data, message: "getted user notes" })

    } catch (error) {
        console.log(error)
    }
}

module.exports.deleteNotes = async (req, res) => {
    try {
        const data = await notesmodel.findOneAndDelete({ id: req.params.id })
        // const data = await notesmodel.findByIdAndRemove(req.params.id)
        // console.log("data---",data)

        res.send({ data, message: "delete notes" })

    } catch (error) {
        console.log(error)
    }
}
module.exports.editNotes = async (req, res) => {
    try {
        const data=await notesmodel.findOneAndUpdate({id:req.params.id},{title:req.body.item})
        // const data = await notesmodel.findByIdAndUpdate({ id: req.params.id }, { title: req.body.item })
        res.send({ data, message: "edit successfully" })
    } catch (error) {
        console.log(error)
    }
}

module.exports.completedNotes = async (req, res) => {
    try {
        const data=await notesmodel.findOneAndUpdate({id:req.params.id},{completed:true})
         res.send({ data, message: "completed SuccessFully" })
    } catch (error) {
        console.log(error)
    }
}