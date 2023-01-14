const Group = require('../models/Group')

const CreateGroup = async(req, res) => {
    try {
       const groupName =  req.body.GroupDetails;
       console.log("groupName",req.body)
       const { email } = req.user;
        const { productId } = req.params;
        const checkGroupName = await Group.findOne({ groupName: groupName }).exec();
        console.log(checkGroupName)
        if(checkGroupName) return res.status(400).json({ msg: 'Group already exists' });
        newGroup = {
            groupName, 
            members: [email],
            productId
        }
        const createdGroup = await new Group(newGroup).save();
        res.json(createdGroup);
    } catch (error) {
        res.status(500).json({error: error.message})
        // res.status(400).json({error: error.message})
    }
}

const getGroup = async(req, res) =>{
    try {
        const { productId } = req.params;
        const group = await Group.find({productId}).exec();
        if( !group ) return res.status(404).json({ msg: 'Group does not exists' })
        res.json(group)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}
const joinGroup = async(req, res) => {
    try {
        const { GroupDetails } = req.body;
        const {groupName} = GroupDetails;
        const { email } = req.user;
        const findGroup = await Group.findOne({ groupName }).exec();
        if(!findGroup) return res.status(404).json({msg: 'Group do not exixts'})
        const existingMembers = findGroup.members;
        if(existingMembers.includes(email)) return res.status(403).json({ msg: 'User is already added' })
        const memberLimit = findGroup.memberLimit;
        if(existingMembers.length == memberLimit) return res.status(403).json({ msg: 'User limit reached' })
        const newMembers = [...existingMembers, email]
        console.log(groupName);
        
        const result = await Group.findOneAndUpdate({groupName}, { members: newMembers } , {new:true}).exec()

        res.json({result})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const removeGroup =async(req,res) =>{
    try {
        //
    } catch (error) {
        //
    }
}


module.exports = { CreateGroup, getGroup, joinGroup }