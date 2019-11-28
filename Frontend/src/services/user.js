import http from "./http";
import { apiUrl } from "../config.json";

export function getHosts() {
  return http.get(apiUrl + "/host");
}
export function checkinVisitor(visitor) {
  return http.post(apiUrl + "/userCheckin", visitor);
}

export function checkoutVisitor(visitor) {
  //console.log(visitor);
  return http.post(apiUrl + "/userCheckout", visitor);
}

export function registerHost(host) {
  //console.log(host);
  return http.post(apiUrl + "/registerHost", host);
}

export function getMeetings(host) {
  return http.get(apiUrl + "/meetingScheduled/" + host._id);
}
