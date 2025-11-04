import { usePermission } from "@/views/permission/hooks/usePermission";
import { message } from "antd";
import { useEffect, useState } from "react";

interface TreeData {
  title: string;
  key: string;
  value: string;
  children?: TreeData[];
}

// 将权限数据转换为树形结构
const transformPermissionsToTree = (permissions: any[]): TreeData[] => {
  // 按类型分组 (系统/自定义)
  const systemPermissions = permissions.filter(p => p.type === "system");
  const customPermissions = permissions.filter(p => p.type === "custom");

  // 按resource分组
  const groupByResource = (perms: any[]) => {
    const groups: Record<string, any[]> = {};
    perms.forEach(p => {
      if (!groups[p.resource]) {
        groups[p.resource] = [];
      }
      groups[p.resource].push(p);
    });
    return groups;
  };

  const buildTreeNodes = (perms: any[], type: string): TreeData[] => {
    const resourceGroups = groupByResource(perms);
    return Object.keys(resourceGroups).map(resource => ({
      title: resource,
      key: `${type}-${resource}`,
      value: `${type}-${resource}`,
      children: resourceGroups[resource].map(p => ({
        title: p.name,
        key: p.code,
        value: p.code,
        isLeaf: true,
      })),
    }));
  };

  const treeData: TreeData[] = [];

  if (systemPermissions.length > 0) {
    treeData.push({
      title: "系统内置权限",
      key: "system",
      value: "system",
      children: buildTreeNodes(systemPermissions, "system"),
    });
  }

  if (customPermissions.length > 0) {
    treeData.push({
      title: "自定义权限",
      key: "custom",
      value: "custom",
      children: buildTreeNodes(customPermissions, "custom"),
    });
  }

  return treeData;
};

export const usePermissionTree = (editingRole?: { permission_codes?: string[] }) => {
  const { fetchPermissions } = usePermission();
  const [treeData, setTreeData] = useState<TreeData[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // 获取权限列表并构建树形结构
  useEffect(() => {
    const loadPermissions = async () => {
      setLoading(true);
      try {
        const res = await fetchPermissions({
          page: 1,
          pageSize: 1000, // 获取所有权限
        });

        const permissions = res.list as any[];
        const treeNodes = transformPermissionsToTree(permissions);
        setTreeData(treeNodes);

        // 如果是编辑模式，设置默认选中的权限
        if (editingRole && editingRole.permission_codes) {
          setCheckedKeys(editingRole.permission_codes);
        }
      } catch (error) {
        message.error("获取权限列表失败: " + (error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadPermissions();
  }, [editingRole]);

  const handleCheck = (checkedKeysValue: any) => {
    setCheckedKeys(checkedKeysValue);
  };

  return {
    treeData,
    checkedKeys,
    loading,
    handleCheck,
  };
};
