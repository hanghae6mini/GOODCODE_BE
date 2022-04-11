const Joi = require('joi');

module.exports = async (req, res, next) => {

    const validcheck = Joi.object({
        feedId: Joi.number().required().error(new Error('Server Error - 요청 필수 값 feedId가 존재하지 않습니다.\n관리자에게 문의하세요.'))
    });

    try{
        await validcheck.validateAsync(req.body);
        next();
    }catch(error){
        return res.status(400).json({
            result: 'FAIL',
            errorMessage: error.message
        });   
    } 

}