import { Input, Modal, Form, message, Select } from "antd";

const sexArr = ["男孩", "女孩"];
const layout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

function CreateEdit ({ visible, appInfo, typeModal, onRefresh, onCancel }){
  const { name, id, sex, age } = appInfo || {};
  const [form] = Form.useForm();

  const onCreate = async (values) => {
    const list = JSON.parse(localStorage.getItem("nameList"));
    const data = {
      id: parseInt(Math.random() * 10000),
      name: values.name,
      age: values.age,
      sex: values.sex,
    };
    if (list instanceof Array) {
      list.push(data);
      localStorage.setItem("nameList", JSON.stringify(list));
    } else {
      localStorage.setItem("nameList", JSON.stringify([data]));
    }
    onRefresh();
  };

  const onUpdate = async (values) => {
    let data = JSON.parse(localStorage.getItem("nameList"));
    data.forEach((item, index) => item.id === id && (data[index] = { id, ...values }));//TODO解构赋值、forEach。
    localStorage.setItem("nameList", JSON.stringify(data));
    onRefresh();
  };

  return (
    <Modal
      maskClosable={false}
      visible={visible}
      title={typeModal === "add" ? "新建圈子" : "编辑圈子"}
      okText="保存"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .catch(() => message.error("表单校验错误,请修正后再提交"))
          .then((values) => {
            if (typeModal === "add") onCreate(values);
            if (typeModal === "edit") onUpdate(values);
          });
      }}
    >
      <Form
        {...layout}
        form={form}
        initialValues={{ name, sex: sex || sexArr[0], age }}
      >
        <Form.Item label="名称" name="name">
          <Input style={{ width: "250px" }} />
        </Form.Item>
        <Form.Item label="年龄" name="age">
          <Input style={{ width: "250px" }} />
        </Form.Item>
        <Form.Item label="性别" name="sex">
          <Select size="small" key="sex">
            {sexArr.map((item) => (
              <Select.Option key={item}>{item}</Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default CreateEdit ;