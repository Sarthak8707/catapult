import crypto from "crypto";

export const generateSDKKey = () => {
  const key = `${crypto.randomBytes(8).toString("hex")}`;

  return key;
};