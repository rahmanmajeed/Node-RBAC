import { DocumentType } from "@typegoose/typegoose";
import { FilterQuery, UpdateQuery } from "mongoose";
import JWT from "../auth/jwt";
import Session, { SessionDocument } from "../models/session.model";
import { User } from "../models/user.model";
import { findUser } from "./user.service";

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
      { expiresIn: `${1}m` }
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

export async function findSession(query: FilterQuery<SessionDocument>) {
  return Session.find(query).lean();
}

export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return Session.updateOne(query, update);
}

//## temporary keep here.in future, will move those below code.

export const createRefreshToken = (user:DocumentType<User>, session: SessionDocument) => {
  return JWT.signToken({...user, session}, { expiresIn: `${1}y` });
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

export const reIssueAccessToken = async (refreshToken: string) => {

  const { decoded }: any = JWT.verifyToken(refreshToken);

  if (!decoded) return false;

  const session = await Session.findById(decoded.session);

  if (!session || !session.valid) return false;

  const user = await findUser({ _id: session.user });
  

  if (!user) return false;

  const access_token = JWT.signToken(
    { ...user, session: session._id },
    { expiresIn: `${15}m` }
  );

  // console.log(access_token)

  return access_token;
};
