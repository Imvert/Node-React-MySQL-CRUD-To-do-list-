export const UserCookie = (req, res, next) => {
  const { token } = req;

  res.cookie("myTokenName", "la metralla", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });
  next();
};
