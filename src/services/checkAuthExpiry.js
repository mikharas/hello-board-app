import { verify } from "jsonwebtoken";

export default function isExpired() {
  const token = JSON.parse(localStorage.getItem("user")).accessToken;
  try {
    verify(token, "secret_key");
  } catch (err) {
    localStorage.removeItem("user");
    return true;
  }
  return false;
}
