export const getActiveRoute: any = (state: any) => {
  const route = state.routes[state?.index || 0];

  if (route.state) {
    // Dive into nested navigators
    return getActiveRoute(route.state);
  }

  return route;
};

export const getPreviousRoute: any = (route: any) => {
  let checkRoute = null;
  if (route.state && route.state.index > -1 && route.state.routes) {
    checkRoute = route.state.routes[route.state.index];
    if (checkRoute.state && checkRoute.state.routes) {
      return getPreviousRoute(checkRoute);
    }
    const previousRouteIndex = route.state.index - 1;
    if (previousRouteIndex > -1) {
      checkRoute = route.state.routes[previousRouteIndex];
    }
  }
  return checkRoute;
};
