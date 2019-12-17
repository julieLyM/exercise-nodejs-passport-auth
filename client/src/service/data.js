import axios from "axios";

export const loginData = async user => {
  const res = await axios.post(`http://localhost:3001/ajaxlogin`, user);
  return res.data;
};
