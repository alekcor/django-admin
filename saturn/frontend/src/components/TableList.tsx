import { Table } from "antd";
import { Link } from "react-router-dom";
import React, {useContext} from "react";
import { Registered } from "../types/types";
import {RegisteredContext} from "../context/RegisteredContext";

export function TableList() {
 const items = useContext(RegisteredContext)
  if (items) {
    return (
      <>
        {items.map((app: Registered) => (
          <Table
            style={{ paddingBottom: "3vh" }}
            key={app.app_label}
            rowKey={"name"}
            columns={[
              {
                title: app.name,
                key: app.app_url,
                dataIndex: "name",
                render: (name, row) => (
                  <Link to={row["admin_url"]}>{name}</Link>
                ),
              },
            ]}
            dataSource={app.models}
            pagination={false}
          />
        ))}
      </>
    );
  }
  return null;
}
