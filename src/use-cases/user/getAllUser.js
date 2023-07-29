function makeGetAllUserAction({getAllUser}){
    return async function getAllUserAction({databaseName}){
        try {
            return await getAllUser({databaseName});
        } catch (error) {
            throw new Error("Error in getting all user");
        }
     
    }
 }

module.exports=makeGetAllUserAction;