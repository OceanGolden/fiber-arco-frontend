import { useGrantMenus, useRoleMenuMutation } from '@/api/system/role/query';
import { Card, Drawer, Grid, Spin, Tree } from '@arco-design/web-react';

import { useMenus } from '@/api/system/menu/query';
import { MenuRecord } from '@/api/system/menu/type';
import type { RoleRecord } from '@/api/system/role/type';
import { useState } from 'react';

const renderTree = (treeList: MenuRecord[] | undefined) => {
  if (!treeList) {
    return null;
  }
  return treeList.map((item) => {
    if (item.children?.length) {
      return (
        <Tree.Node key={item.id} title={item.name}>
          {renderTree(item.children)}
        </Tree.Node>
      );
    }
    return <Tree.Node key={item.id} title={item.name} />;
  });
};

const MutationMenuDrawer = (props: { visible: boolean; onCancel: () => void; formRecord: Partial<RoleRecord> }) => {
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const grantMutation = useRoleMenuMutation();
  const { data: TreeData, isLoading: queryMenuLoading } = useMenus(
    {},
    {
      enabled: !!props.visible,
    },
  );
  const { isLoading: queryGrantLoading } = useGrantMenus(
    { role_id: props.formRecord.id || '1' },
    { enabled: Boolean(props.formRecord.id), onSuccess: (data) => setCheckedKeys(data.map((item) => item.menu_id)) },
  );

  const afterClose = () => {
    setCheckedKeys([]);
  };

  const onOk = () =>
    grantMutation.mutate(
      { role_id: props.formRecord.id, menu_ids: checkedKeys },
      {
        onSuccess: () => {
          props.onCancel();
        },
      },
    );

  const onCheck = (checkedKeys: string[]) => {
    setCheckedKeys(checkedKeys);
  };

  return (
    <Drawer
      width='33.3%'
      unmountOnExit
      visible={props.visible}
      onCancel={props.onCancel}
      afterClose={afterClose}
      onOk={onOk}
      confirmLoading={grantMutation.isLoading}
      title={'授权菜单数据'}
    >
      <Card bordered={false}>
        <Grid.Row gutter={8}>
          <Grid.Col span={24}>
            <Spin loading={queryMenuLoading && queryGrantLoading} size={40}>
              <Tree
                checkable
                autoExpandParent
                checkStrictly
                checkedKeys={checkedKeys}
                onCheck={onCheck}
                virtualListProps={{ threshold: null }}
              >
                {renderTree(TreeData)}
              </Tree>
            </Spin>
          </Grid.Col>
        </Grid.Row>
      </Card>
    </Drawer>
  );
};

export default MutationMenuDrawer;
