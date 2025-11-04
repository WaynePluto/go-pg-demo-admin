import React, { createContext, useContext, useReducer, useCallback } from "react";
import type { RoleDetailResponse } from "../../../hono-api-type/modules/role/model";
import { roleClient } from "../../../api/role";

// 状态接口
interface RoleState {
  roleList: RoleDetailResponse[];
  loading: boolean;
  error: string | null;
}

// 行为接口
interface RoleActions {
  fetchRoles: () => Promise<void>;
}

// 创建分离的Context
const RoleStateContext = createContext<RoleState | undefined>(undefined);
const RoleActionsContext = createContext<RoleActions | undefined>(undefined);

// 状态类型
type RoleAction =
  | { type: "FETCH_ROLES_START" }
  | { type: "FETCH_ROLES_SUCCESS"; payload: RoleDetailResponse[] }
  | { type: "FETCH_ROLES_ERROR"; payload: string };

// 初始状态
const initialState: RoleState = {
  roleList: [],
  loading: false,
  error: null,
};

// Reducer函数
function roleReducer(state: RoleState, action: RoleAction): RoleState {
  switch (action.type) {
    case "FETCH_ROLES_START":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_ROLES_SUCCESS":
      return {
        ...state,
        loading: false,
        roleList: action.payload,
        error: null,
      };
    case "FETCH_ROLES_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

// Provider组件props接口
interface RoleProviderProps {
  children: React.ReactNode;
}

// Provider组件
export function RoleProvider({ children }: RoleProviderProps) {
  const [state, dispatch] = useReducer(roleReducer, initialState);

  const fetchRoles = useCallback(async () => {
    try {
      dispatch({ type: "FETCH_ROLES_START" });
      const res = await roleClient.page.$post({
        json: {
          page: 1,
          pageSize: 100,
        },
      });
      
      const data = await res.json();
      
      if (data.code === 200) {
        dispatch({ type: "FETCH_ROLES_SUCCESS", payload: data.data.list as RoleDetailResponse[] });
      } else {
        dispatch({ type: "FETCH_ROLES_ERROR", payload: data.msg || "获取角色列表失败" });
      }
    } catch (error) {
      dispatch({ type: "FETCH_ROLES_ERROR", payload: (error as Error).message || "获取角色列表失败" });
    }
  }, []);

  const actions: RoleActions = {
    fetchRoles,
  };

  return (
    <RoleStateContext.Provider value={state}>
      <RoleActionsContext.Provider value={actions}>{children}</RoleActionsContext.Provider>
    </RoleStateContext.Provider>
  );
}

// 状态Hook
export function useRoleState() {
  const context = useContext(RoleStateContext);
  if (context === undefined) {
    throw new Error("useRoleState must be used within a RoleProvider");
  }
  return context;
}

// 行为Hook
export function useRoleActions() {
  const context = useContext(RoleActionsContext);
  if (context === undefined) {
    throw new Error("useRoleActions must be used within a RoleProvider");
  }
  return context;
}

// 组合Hook（可选，用于同时获取状态和行为）
export function useRoleContext() {
  return {
    state: useRoleState(),
    actions: useRoleActions(),
  };
}