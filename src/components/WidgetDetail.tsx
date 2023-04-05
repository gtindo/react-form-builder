import React, {useContext} from "react";
import {Button, Input, Space, Switch} from "antd";
import {WidgetType} from "./Widget";
import {MinusCircleOutlined} from "@ant-design/icons";
import {FormBuilderContext} from "./FormBuilder";


export type WidgetDetailData = {
  type: WidgetType,
  title: string,
  required: boolean,
  index: number,
  parentIndex: number
}


const WidgetDetail = ({type, title, required, index, parentIndex}: WidgetDetailData) => {
  const formBuilderContext = useContext(FormBuilderContext);

  const deleteWidget = () => {
    formBuilderContext?.dispatch({type: "delete-widget", payload: {sectionIndex: parentIndex, index}});
  }

  return (
    <div>
      <Space>
        <Button type="primary">{type}</Button>
        <Input type="text" placeholder="Title" value={title} />
        <Switch defaultChecked={required} />
        <Button type="primary" onClick={deleteWidget}><MinusCircleOutlined /></Button>
      </Space>
    </div>
  )
}

export default WidgetDetail;
