import React, { Suspense, lazy } from "react";
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import Loading from "components/shared-components/Loading";

const ClientList = lazy(() => import("./list"));
const EditProfile = lazy(() => import("./setting/EditProfile"));

const Clients = () => {
  const { path } = useRouteMatch();
  const history = useHistory();

  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Switch>
        <Redirect exact from={path} to={`${path}/list`} />
        <Route path={`${path}/list`}>
          <ClientList navigate={history.push} />
        </Route>
        <Route path={`${path}/edit/:userId`}>
          {({ match }) => (
            <EditProfile userId={match.params.userId} navigate={history.push} />
          )}
        </Route>
      </Switch>
    </Suspense>
  );
};

export default Clients;
