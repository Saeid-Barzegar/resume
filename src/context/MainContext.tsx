import React, { createContext, useContext, useMemo, useRef } from 'react'

interface MainContextPropTypes {
  children: React.ReactNode;
}

type ContextType = {
  resumeRef: React.RefObject<HTMLDivElement>;
}

const ResumeContext = createContext<ContextType>({
  resumeRef: { current: null },
});

const MainContext: React.FC<MainContextPropTypes> = ({ children }) => {
  const resumeRef = useRef<HTMLDivElement>(null);

  const initialState = useMemo(() => ({
    resumeRef
  }), [resumeRef])
  return (
    <ResumeContext.Provider value={initialState}>
      {children}
    </ResumeContext.Provider>
  )
}

export default MainContext;

export const useResumeRef = () => useContext(ResumeContext);