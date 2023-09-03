import { DocumentType } from "@typegoose/typegoose";
import JWT from "../auth/jwt";
import Session, { SessionDocument } from "../models/session.model";
import { User } from "../models/user.model";

export const signToken = async ({
  user,
  session,
}: {
  user: DocumentType<User>;
  session: SessionDocument;
}) => {
  try {
    //sign the access token
    const access_token = JWT.signToken(
      { ...user, session: session._id },
      { expiresIn: `${15}m` }
    );

    // Create a Session
    // redisClient.set(user._id, JSON.stringify(user), {
    //   EX: 60 * 60,
    // });

    // Return access token
    return { access_token };
  } catch (error) {
    throw error;
  }
};

export async function createSession(userId: string, userAgent: string) {
  const session = await Session.create({ user: userId, userAgent });

  return session.toJSON();
}

export const createRefreshToken = (session: SessionDocument) => {
  return JWT.signToken(session, { expiresIn: `${1}y` });
};

export const verifyToken = (token: string) => {
  try {
    // Validate Access Token
    const decoded = JWT.verifyToken<{ user: Object }>(token);

    return { decoded };
  } catch (error) {
    throw error;
  }
};
