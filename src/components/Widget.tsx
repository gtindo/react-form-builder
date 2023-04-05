import React from "react";
import {Button} from "antd";
import {
  CalendarOutlined, CheckCircleOutlined,
  FileTextOutlined,
  LinkOutlined,
  MailOutlined,
  NumberOutlined,
  UnorderedListOutlined
} from "@ant-design/icons";
import {useDrag} from "react-dnd";

export type WidgetType = "line" | "text" | "url" | "email" | "select" | "multi-select" | "yes-no" | "date" | "date-time" | "number"

export type WidgetData = {
  type: WidgetType,
}

const Widget = ({type}: WidgetData) => {
  const [collected, drag] = useDrag(() => ({
    type: "widget",
    item: {type}
  }));

  const displayWidget = (): JSX.Element => {
    switch (type) {
      case "text":
        return <><FileTextOutlined /> Text</>
      case "line":
        return <><FileTextOutlined /> Line</>
      case "url":
        return <><LinkOutlined /> Link</>
      case "email":
        return <><MailOutlined /> Email</>
      case "select":
        return <><UnorderedListOutlined /> Select</>
      case "multi-select":
        return <><UnorderedListOutlined /> Multi Select</>
      case "date":
        return <><CalendarOutlined /> Date</>
      case "date-time":
        return <><CalendarOutlined /> Date Time</>
      case "number":
        return <><NumberOutlined /> Number</>
      case "yes-no":
        return <><CheckCircleOutlined /> Switch</>
    }

    return <></>
  }
  return (
    <div style={{display: "inline-block", margin: "2px"}} ref={drag} {...collected}>
      <Button type="primary">{displayWidget()}</Button>
    </div>
  )
}

export default Widget;
