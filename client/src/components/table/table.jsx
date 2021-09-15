import 'antd/dist/antd.css';
import {BuildColumns} from "./columns";
import {Component} from 'react';
import {Button, Dropdown, message, Space, Table} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import {Overlay} from "../dropdown-overlay/Overlay";


class ModelTable extends Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    data: null
  };

  columns() {
    const { sortedInfo, filteredInfo } = this.state;
    return BuildColumns(sortedInfo, filteredInfo)
  }

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };

  clearAll = () => {
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

  onMenuItemClick({key}) {
    message.info(`User ${key} was deleted`)
  }

  componentDidMount() {
    fetch('/api/users/')
      .then(response => response.json())
      .then(response => this.setState({data: response.data}))
  }

  render() {
    const { data } = this.state;

    return (
      <>
        <Space style={{ marginBottom: 16 }}>
          <Dropdown overlay={Overlay(this.onMenuItemClick)} trigger={["click"]}>
            <Button>Actions<DownOutlined/></Button>
          </Dropdown>
          <Button onClick={this.setAgeSort}>Sort age</Button>
          <Button onClick={this.clearFilters}>Clear filters</Button>
          <Button onClick={this.clearAll}>Clear filters and sorters</Button>
        </Space>
        <Table rowSelection={{type: "checkbox"}} columns={this.columns()} dataSource={data} onChange={this.handleChange} />
      </>
    );
  }
}
export default ModelTable;
