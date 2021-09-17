import React from "react";
import { Link } from "react-router-dom";

interface Row {
  id: string;
  list_display: string;
}

export const BuildColumns = (
  dataSource: []|any[],
  modelName?: string,
  appName?: string
) => {

  return [
    {
      title: modelName,
      dataIndex: "id",
      render: (name: string, row: Row): React.ReactNode => (
        <Link to={`/saturn/${appName}/${modelName}/${row.id}/change/`}>
          {row["list_display"]}
        </Link>
      ),
    },
  ];
};
