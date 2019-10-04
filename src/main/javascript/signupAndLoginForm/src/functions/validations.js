export const validateEmail = mail => {
  if (mail.includes("@")) {
    return true;
  } else {
    return false;
  }
};
export const validatePassword = password => {
  if (password.length > 0 && password.length < 4) {
    return "ijambo ry'ibanga washyizemo kurivumbura biroroshye"
  } else if (password.length >= 4 && password.length <= 6) {
    return "ijambo ry'ibanga washyizemo riragerageza ariko si cyane"
  } else if (password.length > 6) {
    return "ijambo ry'ibanga washyizemo rirakomeye, ubu konti yawe byagorana kuyinjiramo"
  } else if (password.length === 0) {
    return "error";
  }
};
