import { ref } from "vue";

export function useAuthState() {
  const handleLogin = (username) => {
    document.cookie = "username=" + username;
  };

  const handleLogout = () => {
    document.cookie = "username=";
  };

  const getUsername = () => {
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf('username=') == 0) {
        return c.substring('username='.length, c.length);
      }
    }
    return "";
  };

  return {
    handleLogin,
    handleLogout,
    getUsername,
  };
}
