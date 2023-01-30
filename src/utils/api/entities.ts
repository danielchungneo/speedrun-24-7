import { generateCrudRoutes } from "@/utils/http";

const customers = {
  ...generateCrudRoutes("customers"),
};

const products = {
  ...generateCrudRoutes("products"),
};

const salesOrders = {
  ...generateCrudRoutes("salesOrders"),
};

const salesOrderLines = {
  ...generateCrudRoutes("salesOrderLines"),
};

const salesOrderStatuses = {
  ...generateCrudRoutes("salesOrderStatuses"),
};

const salesOrderTypes = {
  ...generateCrudRoutes("salesOrderTypes"),
};

const entities = {
  customers,
  products,
  salesOrders,
  salesOrderLines,
  salesOrderStatuses,
  salesOrderTypes,
};

export default entities;
