import crypto from "crypto";

export const generateSDKKey = () => {
  const key = `cat_${crypto.randomBytes(16).toString("hex")}`;

  return key;
};