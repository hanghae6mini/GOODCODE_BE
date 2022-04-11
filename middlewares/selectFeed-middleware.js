const Joi = require("Joi");

module.exports = async (req, res, next) => {
  const validcheck = Joi.object({
    feedType: Joi.string().required().error(new Error("Server Error - 요청 필수 값인 feedType가 존재하지 않습니다.\n관리자에게 문의하세요.")),
    userId: Joi.when("feedType", {
      is: "user",
      then: Joi.string().required().error(new Error("Server Error - 요청 필수 값인 userId가 존재하지 않습니다.\n관리자에게 문의하세요.")),
    }),
  });

  try {
    await validcheck.validateAsync(req.query);
    next();
  } catch (error) {
    return res.status(400).json({
      result: "FAIL",
      errorMessage: error.message,
    });
  }
};
