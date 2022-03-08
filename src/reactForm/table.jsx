import { useState, useEffect } from 'react';
import { Button, Space, Table } from 'antd';
import CreateEdit from './create-edit'; 

//da
const NameListTable = ()=> {
  const [visible, setVisible] = useState(false);
  const [formType, setFormType] = useState('add');
  const [dataSource, setDataSource] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [appInfo, setAppInfo] = useState(null);

  const [paging, setPaging] = useState({ page: 1, pageSize: 4 });

  // 列表表头，对应Table的columns属性
  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: '名称', dataIndex: 'name' },
    { title:'年龄',dataIndex:'age'},
    { title:'性别',dataIndex:'sex'},
    {
      title: '操作',
      dataIndex: 'operate',
      render: (_txt, _record) => ( 
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

  //针对于当前页面的方法，参数为页码page以及pageSize--变量
  const onPage = (pageNum, pageSize) => {
    setPaging({ page: pageNum || 1, pageSize: pageSize || 4 });
    let res=JSON.parse(localStorage.getItem('nameList'))
    if(res instanceof Array){
      setDataSource(res.slice((pageNum-1)*pageSize||0,(pageNum)*pageSize||4)|| []);
      setTotalCount(res.length || 0);
    }
  };
  const onAdd = () => {
    setFormType('add');
    setAppInfo(null);
    setVisible(true);
  };

  // 编辑
  const onUpdate = (data) => {
    setFormType('edit');
    setAppInfo(data);
    setVisible(true);
  };

  //删除
const onDelete =(data) =>{
  const list = JSON.parse(localStorage.getItem("nameList"))
  for(let i=0;i < list.length;i++){
    if(list[i].id === data.id){
      list.splice(i,1)
    }
  }
  localStorage.setItem("nameList",JSON.stringify(list))
  onPage();
}

  
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
          total: totalCount,
          current: paging.page,
          onChange: (pageNum, pageSize) => onPage(pageNum, pageSize),
        }}
      />
      {/* 增改弹窗 */}
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
};

export default NameListTable