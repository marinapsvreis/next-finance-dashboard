import * as jose from "jose";

async function openSessionToken(token: string) { 
  const secret = new TextEncoder().encode(process.env.SESSION_SECRET);
  const { payload } = await jose.jwtVerify(token, secret);

  return payload;
}

async function createSessionToken(payload = {}) {
  const secret = new TextEncoder().encode(process.env.SESSION_SECRET);
  const session = await new jose.SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setExpirationTime('1d').sign(secret);

  return session;   
}

const AuthService = {
  openSessionToken,
  createSessionToken,
}

export default AuthService;