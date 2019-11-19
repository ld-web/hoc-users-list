import Axios from "axios";
import { USER_ENDPOINT } from "./constants";

export const getUsers = () => (
  Axios.get(USER_ENDPOINT).then(res => res.data)
);

export const getUser = async id => {
  const res = await Axios.get(`${USER_ENDPOINT}/${id}`);
  return res.data;
}