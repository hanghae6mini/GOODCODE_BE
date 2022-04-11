const jwt = require("jsonwebtoken");
const User = require("../schemas/user");

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ Message: "authorization 입력해주세요!" });

  const [tokenType, tokenValue] = authorization.split(" ");

  if (tokenType !== "Bearer") {
    res.status(401).json({
      Message: "로그인 후 사용하세요",
    });
    return;
  }
  try {
    const { userId } = jwt.verify(tokenValue, process.env.SECRET_KEY);

    const user = await User.findOne({ userId });

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
