const HAS_CANCELLED = "2h31axsC2xagrcnasdce4ll2ed";
const USER_INFO = "usase2rasdin12312asdfpl2o";
export function setHasCancelledPopUp() {
  sessionStorage.setItem(HAS_CANCELLED, true);
}
export function getHasCancelledPopUp() {
  return sessionStorage.getItem(HAS_CANCELLED);
}
export function getUser() {
  
  return JSON.parse(localStorage.getItem(USER_INFO));
}
export function setUser(user) {
  const info = JSON.stringify(user);
  localStorage.setItem(USER_INFO, info);
}
export function removeUser() {
  localStorage.removeItem(USER_INFO);
}
