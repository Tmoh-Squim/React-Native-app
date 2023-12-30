const bcrypt = require('bcrypt')

const hashPassword = async (password) =>{
   const HashedPassword = await bcrypt.hash(password,12)
    return HashedPassword
}

const comparePassword = async (password,HashedPassword) =>{
    return await bcrypt.compare(password,HashedPassword)
}

module.exports = {hashPassword,comparePassword}
