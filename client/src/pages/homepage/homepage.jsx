import 'antd/dist/antd.css';
import './homepage.scss';
import {Component} from "react/cjs/react.production.min";
import {ApiCaller} from "../../components/apicaller/apicaller";
import SaturnTable from "../../components/table/table";

class HomePage extends Component {
  state = {
    response: '---'
  };

  callApi = () => {
    fetch("/api/")
      .then(response => response.status)
      .then(status => this.setState({response: status}))
  }

  render() {
    const { response } = this.state;
    return (
      <div>
        <SaturnTable />
        <ApiCaller callApi={this.callApi} response={response}/>
      </div>
    );
  }
}

export default HomePage;
