import { useState, useEffect } from "react";
import { Button, Space, Table } from "antd";
import CreateEdit from "./create-edit.tsx";

type FormType = "add" | "edit";

interface StageItem {
  id?: number;
  name: string;
  age: number;
  sex: string;
}

function NameListTable() {
  const [visible, setVisible] = useState<boolean>(false);
  const [formType, setFormType] = useState<FormType>("add");
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [TotalCount, setTotalCount] = useState<number>(0);
  const [appInfo, setAppInfo] = useState<StageItem | null>(null);
  const [paging, setPaging] = useState<{
    page: number;
    pageSize: number;
  }>({ page: 0, pageSize: 10 });//production

  //表头
  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "名称", dataIndex: "name" },
    { title: "性别", dataIndex: "sex" },
    { title: "年龄", dataIndex: "age" },
    {
      title: "操作",
      dataIndex: "oprate",
      render: (_txt: any, _record: any) => (
        <Space size="middle">
          <Button type="link" onClick={() => onUpdate(_record)}>
            编辑
          </Button>
          <Button type="link" onClick={() => onDelete(_record)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

//   const columns = [
//     { title: 'ID', dataIndex: 'id' },
//     { title: '名称', dataIndex: 'name' },
//     { title:'年龄',dataIndex:'age'},
//     { title:'性别',dataIndex:'sex'},
//     {
//       title: '操作',
//       dataIndex: 'operate',
//       render: (_txt :any, _record :any) => ( 
//         <Space size="middle">
//         <Button type="link" onClick={() => onUpdate(_record)}>
//           编辑
//         </Button>
//         <Button type="link" onClick={() => onDelete(_record)}>
//           删除
//         </Button>
//         </Space>
//       ),
//     },
//   ];

  const onPage = (pageNum?: number, pageSize?: number) => {
    setPaging({ page: pageNum || 1, pageSize: pageSize || 4 });
    let res: any = JSON.parse(localStorage.getItem("nameList"));
    if (res instanceof Array) {
      setDataSource(res.slice((pageNum - 1) * pageSize || 0, pageNum * pageSize || 4) || []);
      setTotalCount(res.length || 0);
    }
  };

  //新增
  const onAdd = () => {
    setFormType("add");
    setAppInfo(null);
    setVisible(true);
  };

  //编辑
  const onUpdate = (data :any) => {
    setFormType("edit");
    setAppInfo(data);
    setVisible(true);
  };

  //删除
  const onDelete = (data :any) => {
    const list = JSON.parse(localStorage.getItem("nameList"));
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === data.id) {
        list.splice(i, 1);
      }
    }
    localStorage.setItem("nameList", JSON.stringify(list));
    onPage();
  };

  useEffect(() => onPage(), []);

  return (
    <>
      <Button type="primary" onClick={() => onAdd()}>
        创建新的数据项
      </Button>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSize: paging.pageSize,
          total: TotalCount,
          current: paging.page,
          onChange: (pageNum, pageSize) => onPage(pageNum, pageSize),
        }}
      />
      {/* 弹窗 */}
      {visible && (
        <CreateEdit
          typeModal={formType}
          visible={visible}
          appInfo={appInfo}
          onRefresh={() => {
            onPage(paging.page, paging.pageSize);
            setVisible(false);
          }}
          onCancel={() => setVisible(false)}
        />
      )}
    </>
  );
}
export default NameListTable;
