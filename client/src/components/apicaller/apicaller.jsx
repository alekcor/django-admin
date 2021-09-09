import {Button} from "antd";

export const ApiCaller = ({callApi, response}) => (
  <div>
    <h1>Saturn</h1>
    <Button type="primary" onClick={callApi}>Call API</Button>
    <div>
      API Response: {response}
    </div>
  </div>
)
