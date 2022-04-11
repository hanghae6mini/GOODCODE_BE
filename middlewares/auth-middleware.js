const jwt = require("jsonwebtoken");
const User = require("../schemas/user");

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  const [tokenType, tokenValue] = authorization.split(" ");

  if (tokenType !== "Bearer") {
    res.status(401).json({
      Message: "로그인 후 사용하세요",
    });
    return;
  }
  try {
    const { userInfo } = jwt.verify(tokenValue, process.env.SECRET_KEY);

    const user = await User.findOne({ userId: userInfo.userId });

    if (!user) return Storage.removeItem("token");

    res.locals.user = user;
    next();
  } catch (err) {
    res.status(401).json({
      Message: "잘못된 접근입니다.",
    });
    return;
  }
};
