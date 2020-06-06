export default function getToken() {
  // return authorization header with jwt token
  const token = localStorage.getItem('token');

  if (token) {
    return token;
  }
  return null;
}
