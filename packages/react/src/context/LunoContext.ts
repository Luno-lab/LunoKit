import React from 'react';
import type { LunoState } from '../types';

export type LunoContextState = LunoState;

export const LunoContext = React.createContext<LunoContextState | undefined>(undefined);
