import http from "./http";
import { apiUrl } from "../config.json";
import * as jwt_decode from "jwt-decode";
const apiEndpoint = apiUrl + "/auth";
const tokenKey = "token";

http.setJwt(getJwt());
export function getJwt() {
  return localStorage.getItem(tokenKey);
}
export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}
export function logout() {
  localStorage.removeItem(tokenKey);
}
export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwt_decode(jwt);
  } catch (ex) {
    return null;
  }
}
export default {
  getJwt,
  login,
  logout,
  getCurrentUser,
  loginWithJwt
};
