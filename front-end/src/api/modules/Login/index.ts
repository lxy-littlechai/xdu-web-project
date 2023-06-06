import "@/api"
import { baseInstance } from "@/api"
const { post } = baseInstance;
import { User } from "./types"

const userLogin = (params: User) => {
  post("/url", params);
}

export { userLogin };