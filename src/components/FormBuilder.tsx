import React, {useReducer} from "react";
import {Button, Card, Form, Input, Space} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import Widget, {WidgetType} from "./Widget";
import FormSection, {FormSectionData} from "./FormSection";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

const InitialSections: FormSectionData[] = []

type FormBuilderAction =
  | { type: "add-widget", payload: { sectionIndex: number, type: WidgetType } }
  | { type: "update-widget", payload: { sectionKey: string, widgetKey: string } }
  | { type: "delete-widget", payload: { sectionIndex: number, index: number}}
  | { type: "add-section" }
  | { type: "delete-section", payload: { index: number } }

const builderReducer = (state: FormSectionData[], action: FormBuilderAction): FormSectionData[] => {
  const newState = [...state];
  let index = 0;
  let section: FormSectionData | undefined;

  switch (action.type) {
    case "add-section":
      index = state.length > 0 ? state[state.length - 1].index + 1 : 0 ;
      newState.push({title: "", index, widgets: []});
      break;

    case "delete-section":
      index = state.findIndex(section => section.index === 0);
      newState.splice(index, 1);
      break;

    case "add-widget":
      section = newState.find((section) => section.index === action.payload.sectionIndex);
      if (section) {
        index = section.widgets.length > 0 ? section.widgets[section.widgets.length - 1].index + 1 : 0;
        section.widgets.push({
          type: action.payload.type,
          title: "",
          index: index,
          parentIndex: action.payload.sectionIndex,
          required: false
        })
      }
      break;
    case "delete-widget":
      section = newState.find((section) => section.index === action.payload.sectionIndex);
      if (section) {
        let widgetIndex = section.widgets.findIndex(widget => widget.index === action.payload.index);
        section.widgets.splice(widgetIndex, 1);
        console.log(section.widgets);
      }
      break;
  }

  return newState
}

type FormBuilderContextType = {
  dispatch: React.Dispatch<FormBuilderAction>
}

export const FormBuilderContext = React.createContext<FormBuilderContextType | null>(null);

const FormBuilder = () => {
  const [form] = Form.useForm();

  const [sections, dispatch] = useReducer(builderReducer, InitialSections);

  const addSection = () => dispatch({type: "add-section"});

  const widgets: WidgetType[] = [
    "line", "text", "email", "url", "date", "date-time", "select", "multi-select", "number", "yes-no"
  ]

  return (
    <DndProvider backend={HTML5Backend}>
      <FormBuilderContext.Provider value={{dispatch}}>
        <Card title="Form Builder" bordered={true} style={{width: "600px"}}>
          <Form layout="vertical" form={form}>
            <Form.Item label="Title" name="title" rules={[{required: true, message: "Title is required"}]}>
              <Input type="text"/>
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input.TextArea rows={5}/>
            </Form.Item>
          </Form>

          <Space direction="vertical" style={{width: "100%"}} size="middle">
            <Card title="Widgets">
              {widgets.map((widget, index) => <Widget key={index} type={widget}/>)}
            </Card>

            <Button type="primary" onClick={addSection}><PlusOutlined/> Add a section</Button>

            {sections.map((sec) => <div key={sec.index}>
              <FormSection title={sec.title} index={sec.index} widgets={sec.widgets}/>
            </div>)}
          </Space>
        </Card>
      </FormBuilderContext.Provider>
    </DndProvider>
  )
}

export default FormBuilder;