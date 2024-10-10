import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";

const ACCESS_TOKEN_KEY = 'access_token';

export default function useToken() {
  const [cookies, setCookies, removeCookies] = useCookies();
  const token = cookies[ACCESS_TOKEN_KEY];

  const setToken = (value: string) => {
    setCookies(ACCESS_TOKEN_KEY, value);
  }

  const removeToken = () => {
    removeCookies(ACCESS_TOKEN_KEY);
  }

  if (!!token) {
    const subject = jwtDecode(token).sub;

    return { token: cookies["access_token"], subject, setToken, removeToken };
  }
  return { token: undefined, subject: undefined, setToken, removeToken };
}