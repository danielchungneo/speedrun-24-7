import { HTTP_REQUEST_METHODS } from "@/constants/http";
import { IBuildUrlOptions } from "@/constants/types";

const permissionsForm = {
  get: (options?: IBuildUrlOptions) => {
    return {
      url: "/view/components/permissionsForm",
      method: HTTP_REQUEST_METHODS.GET,
      options,
    };
  },
  update: (options?: IBuildUrlOptions) => {
    return {
      url: `/view/components/permissionsForm`,
      method: HTTP_REQUEST_METHODS.PUT,
      options,
    };
  },
};

const salesOrderForm = {
  save: (options?: IBuildUrlOptions) => {
    if (options?.path?.id === "create") {
      return {
        url: `/view/components/salesOrderForm`,
        method: HTTP_REQUEST_METHODS.POST,
        options,
      };
    }
    return {
      url: `/view/components/salesOrderForm/:id`,
      method: HTTP_REQUEST_METHODS.PUT,
      options,
    };
  },
};

const components = {
  permissionsForm,
  salesOrderForm,
};

export default components;
