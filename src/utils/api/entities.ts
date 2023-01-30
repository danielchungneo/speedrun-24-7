import {
  ICustomersApi,
  IEntitiesApi,
  IProductsApi,
  ISalesOrdersApi,
  ISalesOrderStatusesApi,
  ISalesOrderTypesApi,
} from 'types/apis/entities';
import { generateCrudRoutes } from '@/utils/http';

// Plop Pattern: Append to Entities API const
const customers: ICustomersApi = {
  ...generateCrudRoutes('customers'),
};

const products: IProductsApi = {
  ...generateCrudRoutes('products'),
};

const salesOrders: ISalesOrdersApi = {
  ...generateCrudRoutes('salesOrders'),
};

const salesOrderLines: ISalesOrderStatusesApi = {
  ...generateCrudRoutes('salesOrderLines'),
};

const salesOrderStatuses: ISalesOrderStatusesApi = {
  ...generateCrudRoutes('salesOrderStatuses'),
};

const salesOrderTypes: ISalesOrderTypesApi = {
  ...generateCrudRoutes('salesOrderTypes'),
};

const entities: IEntitiesApi = {
  // Plop Pattern: Append to Entities API Export
  customers,
  products,
  salesOrders,
  salesOrderLines,
  salesOrderStatuses,
  salesOrderTypes,
};

export default entities;
