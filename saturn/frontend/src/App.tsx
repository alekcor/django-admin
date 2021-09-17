import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import { BaseLayout } from "./layouts/BaseLayout";
import { TableListDetail } from "./components/TableListDetail";
import { SideBar } from "./components/SideBar";
import { TableList } from "./components/TableList";
import { Registered } from "./types/types";
import { STNApiClient } from "./lib/api";
import "./App.css";
import { AddChangeForm } from "./components/ChangeForm";
import { ListDetail } from "./components/ListDetail";
import { RegisteredContext } from "./context/RegisteredContext";

export function App() {
  const [registered, setRegistered] = useState<Registered[]>([]);

  const BASE_URL = "saturn";
  useEffect(() => {
    const api = new STNApiClient(`/${BASE_URL}/api/`);
    async function getRegistered() {
      await api.getRegistered().then((data: any) => setRegistered(data));
    }
    getRegistered();
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <BrowserRouter>
        <RegisteredContext.Provider value={registered}>
          <SideBar />
        </RegisteredContext.Provider>
        <BaseLayout>
          <Switch>
            <Route
              exact
              path={`/${BASE_URL}`}
              render={() => (
                <RegisteredContext.Provider value={registered}>
                  <TableList />
                </RegisteredContext.Provider>
              )}
            />
            <Route
              exact
              path={`/${BASE_URL}/:appName`}
              render={(props) => <TableListDetail {...props} />}
            />
            <Route
              exact
              path={`/${BASE_URL}/:appName/:modelName`}
              render={(props) => (
                <ListDetail
                  modelName={props.match.params.modelName}
                  appName={props.match.params.appName}
                />
              )}
            />
            <Route
              exact
              path={`/${BASE_URL}/:appName/:modelName/add`}
              render={(props) => (
                <AddChangeForm
                  modelName={props.match.params.modelName}
                  appName={props.match.params.appName}
                />
              )}
            />
            <Route
              exact
              path={`/${BASE_URL}/:appName/:modelName/:id/change`}
              render={(props) => (
                <AddChangeForm
                  modelName={props.match.params.modelName}
                  appName={props.match.params.appName}
                  id={props.match.params.id}
                />
              )}
            />
          </Switch>
        </BaseLayout>
      </BrowserRouter>
    </Layout>
  );
}
