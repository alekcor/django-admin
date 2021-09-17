import React, { useEffect, useState } from "react";
import { MatchParams, IAddChangeForm } from "../types/types";
import Cookies from "js-cookie";

import { message, Form, Input, Button, Row, Col } from "antd";

const layout = {
  wrapperCol: {
    span: 8,
  },
};

function Capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function AddChangeForm(props: MatchParams) {
  const [data, setData] = useState<IAddChangeForm>({});

  const modelName = props.modelName;
  const appName = props.appName;
  const id = props.id;

  const CHANGE_URL: string = `/saturn/api/${appName}/${modelName}/${id}/change/`;
  const ADD_URL: string = `/saturn/api/${appName}/${modelName}/add/`;
  const URL = id ? CHANGE_URL : ADD_URL;
  const METHOD = id ? "PUT" : "POST";

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [URL]);

  const [form] = Form.useForm();

  function postFormData(values: Object) {
    const csrftoken = Cookies.get("csrftoken");
    const headers = new Headers();
    if (csrftoken) {
      headers.append("X-CSRFToken", csrftoken);
    }
    headers.append("Content-Type", "application/json");

    fetch(URL, {
      method: METHOD,
      body: JSON.stringify(values),
      headers: headers,
      credentials: "include",
    })
      .then(() => {
        message.success("New entry added");
      })
      .catch(() => message.error("Failed to create"));
  }

  function onFinishFailed(errorInfo: Object) {
    console.log("Failed:", errorInfo);
  }

  function onInputChange(
    field: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    if (field) {
      data[field] = event.target.value;
    }
    setData(data);
  }

  function getInputValue(field: string) {
    return data[field];
  }

  function getFormFields() {
    const { meta } = data;
    const formFields = meta ? Object.keys(meta) : [];
    return formFields.map((field) => (
      <Form.Item
        {...layout}
        key={field}
        label={Capitalize(field)}
        name={field}
        rules={[{ required: true }]}
        initialValue={getInputValue(field)}
      >
        <Input onChange={(e) => onInputChange(field, e)} />
      </Form.Item>
    ));
  }
  return (
    <Form
      {...layout}
      name="basic"
      layout={"vertical"}
      form={form}
      onFinish={postFormData}
      onFinishFailed={onFinishFailed}
    >
      {getFormFields()}
      <Row style={{paddingTop: 32}}>
        <Col span={8}>
          <Button size={"large"} type={"primary"} danger>
            Delete
          </Button>
        </Col>
        <Col span={16} style={{ textAlign: "right" }}>
          <Button size={"large"} style={{marginRight: 16}}>Save and add another</Button>
          <Button size={"large"} style={{marginRight: 16}}>Save and continue editing</Button>
          <Button type="primary" htmlType="submit" size={"large"}>
            SAVE
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
