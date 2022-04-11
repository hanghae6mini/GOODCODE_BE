const Joi = require('Joi');

module.exports = async (req, res, next) => {

    console.log(req.body);

    const validcheck = Joi.object({
        feedId: Joi.number().required().error(new Error('Server Error - 요청 필수 값인 feedId의 형식이 잘못되었거나, 존재하지 않습니다.')),
        content: Joi.string().required().error(new Error('Server Error - 요청 필수 값인 content가 존재하지 않습니다.\n관리자에게 문의하세요.')),
        image: Joi.any()
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