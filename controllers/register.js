const handleRegister = (req,res,bcrypt,db) =>{
    const {email, password, name} = req.body;
    const hash = bcrypt.hashSync(password);

    if(!email || !password || !name){
        return res.status(400).json('incorrect form submission');
    }

    db.transaction((trx)=>{
        trx.insert({
            email:email,
            hash:hash
        })
        .into('login')
        .returning('email')
        .then((loginEmail) => {
            return trx('users')
            .returning('*')
            .insert({
                email:loginEmail[0].email,
                name:name,
                joined: new Date()
            })
            .then( (user) =>{
                res.json(user[0])
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })

        .catch((error)=>{
            res.status(400).json('unable to register')
    })
    
}

module.exports = {
    handleRegister: handleRegister
}