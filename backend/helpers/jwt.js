import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (user) => {
  return jsonwebtoken.sign(
    {
      id: user._id,
      email: user.email,
      firstname: user.firstname,
    },
    process.env.SECRET,
    {
      expiresIn: "7d",
    },
  );
};
