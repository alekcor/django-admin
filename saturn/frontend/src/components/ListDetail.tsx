import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { Button, Dropdown, message, Space, Table, Input } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Key } from "antd/es/table/interface";
import Cookies from "js-cookie";
import { BuildColumns } from "./Column";
import { MatchParams } from "../types/types";
import { Overlay } from "./Overlay";

const { Search } = Input;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function ListDetail(props: MatchParams) {
  const searchParams = useQuery();
  const history = useHistory();
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);

  const modelName = props.modelName;
  const appName = props.appName;

  const URL = `/saturn/api/${appName}/${modelName}/`;

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((dataSource) => setDataSource(dataSource));
  }, [URL]);

  function onRowSelectionChange(selectedRowKeys: Key[]) {
    // If setSelectedRowKeys is passed directly to rowSelection it will re-render infinitely.
    setSelectedRowKeys(selectedRowKeys);
  }

  function onDeleteAction() {
    const csrftoken = Cookies.get("csrftoken");
    const headers = new Headers();

    if (csrftoken) {
      headers.append("X-CSRFToken", csrftoken);
    }

    fetch(URL, {
      method: "DELETE",
      body: JSON.stringify({ selectedKeys: selectedRowKeys }),
      headers: headers,
      credentials: "include",
    })
      .then(() => {
        handleDelete();
        message.success("Deleted");
      })
      .catch((error) => message.error(`Failed to delete: ${error}`));
  }

  function onSearch(term: string): void {
    /**
     * Once a search term has been submitted:
     * - Append the search term to the querystring under the "q" argument.
     *   This is important so people can share search results.
     * - TODO - If the page is loaded with a search parameter, use that to populate the table.
     */
    history.push(`?q=${term}`);
    console.log(searchParams.get("q"));
  }

  function handleDelete() {
    const updatedDate = dataSource.filter(
      (item) => !selectedRowKeys.includes(item.id)
    );
    setDataSource(updatedDate);
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onRowSelectionChange,
  };

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Dropdown overlay={Overlay(onDeleteAction)} trigger={["click"]}>
          <Button>
            Actions
            <DownOutlined />
          </Button>
        </Dropdown>
        <Link to={`/saturn/${appName}/${modelName}/add/`}>
          <Button>Add</Button>
        </Link>
        <Search placeholder="Search" onSearch={onSearch} enterButton />
      </Space>

      <Table
        rowKey={(obj) => obj.id}
        rowSelection={rowSelection}
        columns={BuildColumns(dataSource, modelName, appName)}
        dataSource={dataSource}
      />
    </>
  );
}
