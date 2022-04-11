const User = require('../schemas/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function signUp(req, res) {
    // #swagger.tags = ['User']
    // #swagger.summary = "회원가입"

    const {userId, nickname, password, validPassword} = req.body

    const existUserId = await User.find({userId})
    if (existUserId.length) {
        return res.status(400).json({message: '중복된 아이디가 있습니다.'});
    }

    const existNickname = await User.find({nickname})
    if (existNickname.length) {
        return res.status(400).json({message: '중복된 닉네임이 있습니다.'});
    }

    if (password !== validPassword) {
        return res.status(400).json({message: '비밀번호가 일치하지 않습니다.'});
    }

    const hashPw = bcrypt.hashSync(password, +process.env.SECRET_SALT);

    await User.create({userId, nickname, password: hashPw});
    res.status(201).json({message: '회원가입이 완료되었습니다.'});
}

async function login(req, res) {
    // #swagger.tags = ['User']
    // #swagger.summary = "로그인"

    const {userId, password} = req.body;

    // 아이디 비교
    const user = await User.findOne({userId});
    if (!user) {
        return res.status(401).json({result: 'fail', errorMessage: '아이디 또는 비밀번호가 일치하지 않습니다.'});
    }

    // 비밀번호 비교
    const hashPw = bcrypt.compareSync(password, user.password) // 일치하면 true 틀리면 false
    if (!hashPw) {
        return res.status(401).json({result: 'fail', errorMessage: '아이디 또는 비밀번호가 일치하지 않습니다.'});
    }

    // jwtToken 생성
    const token = jwt.sign({
        userId: user.userId,
        nickname: user.nickname,
    }, process.env.SECRET_KEY,
        {
            expiresIn: '60m',
            issuer: 'GOODCODE'
        });

    res.status(200).send({token, message: '로그인이 완료되었습니다.'});
}

module.exports = {
    signUp,
    login,
};