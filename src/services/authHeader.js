export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.accessToken) {
    // for Node.js Express back-end
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer: ${user.accessToken}`,
    };
  } else {
    return {};
  }
}
