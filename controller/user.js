const User = require('../schemas/user');
const bcrypt = require('bcrypt');

async function signUp(req, res) {
    // #swagger.tags = ['User']
    // #swagger.summary = "회원가입"

    const {userId, nickname, password, validpassword} = req.body

    const existUserId = await User.find({userId})
    if (existUserId.length) {
        return res.status(400).json({message: '중복된 아이디가 있습니다.'});
    }

    const existNickname = await User.find({nickname})
    if (existNickname.length) {
        return res.status(400).json({message: '중복된 닉네임이 있습니다.'});
    }

    if (password !== validpassword) {
        return res.status(400).json({message: '비밀번호가 일치하지 않습니다.'});
    }

    const hashPw = bcrypt.hashSync(password, +process.env.SECRET_SALT);

    await User.create({userId, nickname, password: hashPw});
    res.status(201).json({message: '회원가입이 완료되었습니다.'});
}

module.exports = {
    signUp
};