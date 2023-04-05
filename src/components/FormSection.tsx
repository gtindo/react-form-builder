import React, {useContext} from "react";
import {Button, Card, Input, Space} from "antd";
import WidgetDetail, {WidgetDetailData} from "./WidgetDetail";
import {MinusCircleOutlined} from "@ant-design/icons";
import {FormBuilderContext} from "./FormBuilder";
import {WidgetType} from "./Widget";
import {useDrop} from "react-dnd";

export type FormSectionData = {
  title: string,
  index: number,
  widgets: WidgetDetailData[]
}

const FormSection = ({title, index, widgets}: FormSectionData) => {
  const formBuilderContext = useContext(FormBuilderContext);

  const addWidget = (type: WidgetType) => {
    formBuilderContext?.dispatch({type: "add-widget", payload: {sectionIndex: index, type}});
  }

  const deleteSection = () => {
    formBuilderContext?.dispatch({type: "delete-section", payload: {index}})
  }

  const [, drop] = useDrop(() => ({
    accept: "widget",
    drop: (item, monitor) => {
      console.log(widgets);
      addWidget(monitor.getItem<{type: WidgetType}>().type);
    }
  }))

  return (
    <Card>
      <Space direction="vertical" size="middle" style={{width: "100%"}}>
        <Space>
          <Input placeholder="Section title" value={title} />
          <Button type="primary" onClick={deleteSection}><MinusCircleOutlined /></Button>
        </Space>

        <div ref={drop}>
          <Card>
            <Space direction="vertical">
              {widgets.map((w) =>
                <div key={w.index}>
                  <Space>
                    <WidgetDetail type={w.type} title={w.title} required={w.required} index={w.index} parentIndex={index} />
                  </Space>
                </div>
              )}
            </Space>
          </Card>
        </div>
      </Space>
    </Card>
  )
}

export default FormSection;
