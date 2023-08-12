import jwt, { SignOptions } from "jsonwebtoken";
import Authentication from "../core/Authentication";
import Env from "../core/Env";

class JWT extends Authentication {
  constructor(publicKey: string, privateKey: string) {
    super(publicKey, privateKey);
  }

  /**
   * siging new jwt
   * @param {payload, scecretkey, options}
   *
   * @return {JWT token}
   */

  public signToken(payload: Object, options: SignOptions): string {
    try {
      /**
       * @jwt {sign()}
       * create a new Json Web Token (JWT) for a user and returns the token in the form of a JSON string
       * @jwt @sign method receives {payload, secretkey, options}
       */

      return jwt.sign(payload, this.getPrivateKey(), {
        ...(options && options),
        algorithm: "RS256",
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * de-code token,public key and verify token with jwt.verify()
   * @param {token}
   * @return {token | null}
   */
  public verifyToken<T>(token: string): T | null {
    try {
      return jwt.verify(token, this.getPublicKey()) as T;
    } catch (error) {
      return null;
    }
  }
}

export default new JWT(
  Env.get("ACCESS_TOKEN_PUBLIC_KEY", null),
  Env.get("ACCESS_TOKEN_PRIVATE_KEY", null)
);
