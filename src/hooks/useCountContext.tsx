/**
 * 使用AI生成上下文代码，参考提示词：
 * 帮我封装一个功能到react context中，要有一个状态count, 一个addCount的修改方法。
 * 请将状态和行为进行上下文分离。
 * 最后把你写的typescript代码都写一个useCountContext.ts中
 */

import React, { createContext, useContext, useReducer, useCallback } from "react";

// 状态接口
interface CountState {
  count: number;
}

// 行为接口
interface CountActions {
  addCount: (amount?: number) => void;
}

// 创建分离的Context
const CountStateContext = createContext<CountState | undefined>(undefined);
const CountDispatchContext = createContext<CountActions | undefined>(undefined);

// 状态类型
type CountAction = { type: "ADD_COUNT"; payload: number };

// 初始状态
const initialState: CountState = {
  count: 0,
};

// Reducer函数
function countReducer(state: CountState, action: CountAction): CountState {
  switch (action.type) {
    case "ADD_COUNT":
      return {
        ...state,
        count: state.count + action.payload,
      };
    default:
      return state;
  }
}

// Provider组件props接口
interface CountProviderProps {
  children: React.ReactNode;
  initialCount?: number;
}

// Provider组件
export function CountProvider({ children, initialCount }: CountProviderProps) {
  const [state, dispatch] = useReducer(countReducer, {
    ...initialState,
    count: initialCount ?? initialState.count,
  });

  const addCount = useCallback((amount: number = 1) => {
    dispatch({ type: "ADD_COUNT", payload: amount });
  }, []);

  const actions: CountActions = {
    addCount,
  };

  return (
    <CountStateContext.Provider value={state}>
      <CountDispatchContext.Provider value={actions}>{children}</CountDispatchContext.Provider>
    </CountStateContext.Provider>
  );
}

// 状态Hook
export function useCountState() {
  const context = useContext(CountStateContext);
  if (context === undefined) {
    throw new Error("useCountState must be used within a CountProvider");
  }
  return context;
}

// 行为Hook
export function useCountDispatch() {
  const context = useContext(CountDispatchContext);
  if (context === undefined) {
    throw new Error("useCountDispatch must be used within a CountProvider");
  }
  return context;
}

// 组合Hook（可选，用于同时获取状态和行为）
export function useCount() {
  return {
    state: useCountState(),
    actions: useCountDispatch(),
  };
}
