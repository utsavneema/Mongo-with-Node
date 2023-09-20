const mongoose = require("mongoose");
const users = require ("../models/userSchema")


async function userRecursion (req, res){
    // const allUsersData = [
    //     { id: 1, name: "abc1", parent_id: 0 },
    //     { id: 2, name: "abc2", parent_id: 1 },
    //     { id: 3, name: "abc3", parent_id: 2 },
    //     { id: 4, name: "abc4", parent_id: 1 },
    //     { id: 5, name: "abc5", parent_id: 4 },
    //     // { id: 6, name: "abc6", parent_id: 3 },
    //     // { id: 7, name: "abc7", parent_id: 5 },
    //     // { id: 8, name: "abc8", parent_id: 1 },
    //     // { id: 9, name: "abc8", parent_id: 2 },
    //     // { id: 10, name: "abc8", parent_id: 5 },
    //   ];
    try{
        // const allUsers =  users.insertMany(allUsersData);
        // console.log('Data inserted successfully');

        async function findChildren(id) {
            const children = await users.find({ parent_id: id });
           // console.log(children);
            const child = children.map(async (child) => {
              const subchild = await findChildren(child.id);
              const allChild = [child.id, ...subchild];
              return allChild;
            });
          
            const childs = await Promise.all(child);
            // const childArray = childs.flat();
            return childs.flat();
          }
          
          async function getModified(row) {
            row.child = await findChildren(row.id);
            return row;
          }
          const allUserData = await users.find();
        //   console.log(allUserData);

          const modifiedUsers = await Promise.all (
            allUserData.map(async (user) => await getModified(user))
          );
        // console.log(modifiedUsers);
            
        return res.status(200).json({ status: true, message: "Data agyaaaa", result: modifiedUsers });
        
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ status: false, message: "Error----------------------" });
    } 
}

module.exports = {userRecursion}


// async function findChildren(id) {
        //     const children = await users.find({ parent_id: id });
        //     let childIds = [];
          
        //     children.forEach((child) => {
        //       childIds.push(child.id);
        //     });
          
        //     children.forEach(async (child) => {
        //       const subChild = await findChildren(child.id);
        //       childIds.push(...subChild);
        //     });
          
        //     return childIds;
        //   }