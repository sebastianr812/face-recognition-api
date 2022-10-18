const handleProfileGet = (req,res,db)=>{
    const {id} = req.params
   

    db.select('*').from('users').where({
        id: id
    })
    .then( userFromDb =>{
        if(userFromDb.length){
            res.json(userFromDb[0])
        }else{
            res.status(400).json('user not found')
        }
        
    })
    .catch((error)=>{
        res.status(400).json('error getting user')
    })
    
}

module.exports = {
    handleProfileGet : handleProfileGet
}