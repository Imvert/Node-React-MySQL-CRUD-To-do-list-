import jwt from "jsonwebtoken";
import { Secret_key } from "../../config.js";

export const tokenEstractor = (req, res, next) => {
  const authorization = req.get("authorization");
  let token = " ";

  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.substring(7);
  }
  let decodedToken = {};
  decodedToken = jwt.verify(token, Secret_key);

  const decodedTokenId = decodedToken.userForToken.id; //el id del usuario

  if (!token || !decodedTokenId) {
    return res.status(401).json({
      msg: "token missing or invalid",
    });
  }

  req.user_id = decodedTokenId;
  next();
};
