import * as React from 'react';
import { Input, Modal, Form, message,Select } from 'antd';

type FormType = 'add' | 'edit';

interface StageItem {
    id ?: number;
    name : string;
    age : number;
    sex : string;
}

interface EditFormProps {
    typeModal : FormType;
    visible : boolean;
    appInfo : StageItem | null;
    onRefresh : ()=> void;
    onCancel : ()=> void;
}

const sexArr = ['男娃','女娃'];
const layout = {labelCol : {span : 4}, wrapperCol : {span : 20 } }; 
    
function CreateEdit ({
    typeModal,
    visible ,   
    appInfo,
    onRefresh,
    onCancel
} : EditFormProps) :JSX.Element{
    const {id , name , age , sex } = appInfo || {};
    const [form] = Form.useForm();

    const onCreate = async (values : StageItem) => {
        const list = JSON.parse(localStorage.getItem("nameList"));
        const data = {
            id : Math.floor(Math.random() * 10000),
            name : values.name,
            age : values.age,
            sex : values.sex,
        };
         if(list instanceof Array){
             list.push(data);
             localStorage.setItem('nameList' , JSON.stringify(list));
         }
         else{
             localStorage.setItem('nameList' , JSON.stringify([data]));
         }
         onRefresh();
    }

    const onUpdate = async (values : StageItem) => {
        
        const list = JSON.parse(localStorage.getItem('nameList'));
        list.forEach((item : any, index : any) => item.id === id && (list[index] = { id, ...values }));
        localStorage.setItem('nameList' , JSON.stringify(list))
        onRefresh();
    };

    return(
        <Modal
        maskClosable = {false}
        visible = {visible}
        title = {typeModal === 'add' ? '新建圈子' : '编辑圈子'}
        okText = '保存'
        cancelText = '取消'
        onCancel = {onCancel}
        onOk = {() =>{
            form
            .validateFields()
            .catch(() => message.error('表单验证错误，请修正之后再提交！'))
            .then((values) => {
                if(typeModal === 'add') onCreate(values);
                if(typeModal === 'edit') onUpdate(values);
            });
        }}
        >
            <Form
            {...layout}
            form = {form}
            initialValues = {{name : name , sex : sex || sexArr[0] , age : age }}
            >
                <Form.Item label = '名称' name = 'name'>
                    <Input style={{width: '200px'}} />
                </Form.Item>
                <Form.Item label = '年龄' name = 'age'>
                    <Input style={{width: '200px'}} />
                </Form.Item>
                <Form.Item label = '性别' name = 'sex'>
                    <Select size = 'small' key = 'sex'>
                        {sexArr.map((item)=>(
                            <Select.Option key = {item}> {item} </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default CreateEdit;