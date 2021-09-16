import 'antd/dist/antd.css';
import {BuildColumns} from "./columns";
import {Component} from 'react';
import {Button, Dropdown, Space, Table} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import {Overlay} from "../dropdown-overlay/Overlay";


class ModelTable extends Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    data: null,
    selectedRowKeys: []
  };

  columns() {
    const { sortedInfo, filteredInfo } = this.state;
    return BuildColumns(sortedInfo, filteredInfo)
  }

  onRowSelectionChange = (selectedRowKeys) => {
    this.setState({selectedRowKeys})
  }

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  clearFiltersAndSorters = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  setAgeSort = () => {
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'age',
      },
    });
  };

  onMenuItemClick= () => {
    const {selectedRowKeys, data} = this.state

    const updatedDate = data.filter(item => !selectedRowKeys.includes(item.key))
    this.setState({data: updatedDate})
  }

  componentDidMount() {
    fetch('/api/users/')
      .then(response => response.json())
      .then(response => this.setState({data: response.data}))
  }

  render() {
    const { data, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onRowSelectionChange
    }
    return (
      <>
        <Space style={{ marginBottom: 16 }}>
          <Dropdown overlay={Overlay(this.onMenuItemClick)} trigger={["click"]}>
            <Button>Actions<DownOutlined/></Button>
          </Dropdown>
          <Button onClick={this.setAgeSort}>Sort age</Button>
          <Button type={"link"} onClick={this.clearFiltersAndSorters}>Clear</Button>
        </Space>
        <Table
          rowSelection={rowSelection}
          columns={this.columns()}
          dataSource={data}
          onChange={this.handleChange} />
      </>
    );
  }
}
export default ModelTable;
