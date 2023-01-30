import { IApi } from "@/constants/types";
import auth from "./auth";
import components from "./components";
import entities from "./entities";

const api: IApi = {
  auth,
  components,
  entities,
};

export default api;
