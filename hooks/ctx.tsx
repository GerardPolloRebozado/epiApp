import React, { createContext, useContext } from 'react';
import { useStorageState } from '@/app/useStorageState';

const AuthContext = createContext<{
    signIn: (token: string) => void;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
}>({
    signIn: () => null,
    signOut: () => null,
    session: null,
    isLoading: false,
});
export default function useSession() {
    return useContext(AuthContext);
}

export function SessionProvider({ children }: React.PropsWithChildren<{}>) {
    const [[isLoading, session], setSession] = useStorageState('session');

    const signIn = (token: string) => {
        setSession(token);
    };

    const signOut = () => {
        setSession(null);
    };

    return (
        <AuthContext.Provider
            value={{
                signIn,
                signOut,
                session,
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
