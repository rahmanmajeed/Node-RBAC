import JWT from "../auth/jwt";
import Env from "../core/Env";

export const signToken = async (user: Object) => {
  try {
    
    const access_token = JWT.signToken(user, {expiresIn: `${15}m`});
    return { access_token };
  } catch (error) {
    throw error;
  }
};

export const verifyToken =  (token:string) => {
    try {
      // Validate Access Token
    const decoded = JWT.verifyToken<{ user: Object }>(token);

    return {decoded};
    } catch (error) {
      throw error;
    }
  };
