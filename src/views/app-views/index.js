import React, { Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from "components/shared-components/Loading";
import { APP_PREFIX_PATH } from "configs/AppConfig";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const PlannerWrapper = () => {
  const Planner = lazy(() => import("./planner"));

  return (
    <DndProvider backend={HTML5Backend}>
      <Planner />
    </DndProvider>
  );
};

const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Switch>
        <Route
          path={`${APP_PREFIX_PATH}/dashboard`}
          component={lazy(() => import("./dashboard"))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/clients`}
          component={lazy(() => import("./clients"))}
        />

        <Route path={`${APP_PREFIX_PATH}/planner`} component={PlannerWrapper} />

        {/* <Route
          path={`${APP_PREFIX_PATH}/catalog/products`}
          component={lazy(() => import("./catalog/products"))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/catalog/categories`}
          component={lazy(() => import("./catalog/categories"))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/catalog/collections`}
          component={lazy(() => import("./catalog/collections"))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/catalog/combo`}
          component={lazy(() => import("./catalog/combo"))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/orders`}
          component={lazy(() => import("./orders"))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/clients/list`}
          component={lazy(() => import("./clients/list"))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/clients/groups`}
          component={lazy(() => import("./clients/groups"))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/banners`}
          component={lazy(() => import("./banners"))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/promocodes`}
          component={lazy(() => import("./promocodes"))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/offline-points/addresses`}
          component={lazy(() => import("./offline-points/addresses"))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/offline-points/geozones`}
          component={lazy(() => import("./offline-points/geozones"))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/employees`}
          component={lazy(() => import("./employees"))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/mailings`}
          component={lazy(() => import("./mailings"))}
        />

        <Route
          path={`${APP_PREFIX_PATH}/settings`}
          component={lazy(() => import("./settings"))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/mobile-app`}
          component={lazy(() => import("./mobile-app"))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/logs`}
          component={lazy(() => import("./logs"))}
        /> */}

        <Redirect
          from={`${APP_PREFIX_PATH}`}
          to={`${APP_PREFIX_PATH}/dashboard`}
        />
      </Switch>
    </Suspense>
  );
};

export default React.memo(AppViews);
