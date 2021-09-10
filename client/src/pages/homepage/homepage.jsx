import 'antd/dist/antd.css';
import './homepage.scss';
import {Component} from "react/cjs/react.production.min";
import SaturnTable from "../../components/table/table";

class HomePage extends Component {
  render() {
    return (
      <div>
        <SaturnTable />
      </div>
    );
  }
}

export default HomePage;
