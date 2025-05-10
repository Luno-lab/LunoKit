import React, { useContext } from 'react';
import { LunoContext, LunoContextState } from '../context/LunoContext';

export const useLuno = (): LunoContextState => {
  const context = useContext(LunoContext);
  if (context === undefined) {
    throw new Error('useLuno must be used within a LunoProvider');
  }
  return context as LunoContextState;
};
