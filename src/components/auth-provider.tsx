import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { nanoid } from 'nanoid';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';

export interface IAuthContext {
  authUrl?: string;
  authenticated: boolean;
  user: any;
}

export interface IAuthContextWithMethods extends IAuthContext {
  signIn: () => void;
}

const AuthContext = createContext<IAuthContextWithMethods | undefined>(
  undefined
);

export function AuthProvider({
  children,
}: PropsWithChildren<IAuthContext>): JSX.Element {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [authUrl, setAuthUrl] = useState<string | undefined>();
  const [user, setUser] = useState<any>();
  const [lastLoginAttempt, setLastLoginAttempt] = useState(nanoid());

  function attemptSignIn() {
    console.log(authUrl);
    if (authUrl) {
      void router.push(authUrl);
    }
    setLastLoginAttempt(nanoid());
  }

  function handleSignIn({ authenticated, authUrl, user }: IAuthContext) {
    setAuthenticated(authenticated);
    setAuthUrl(authUrl);
    setUser(user);
  }

  useEffect(() => {
    void signIn(handleSignIn);
  }, [lastLoginAttempt]);

  return (
    <AuthContext.Provider
      value={{ authenticated, authUrl, user, signIn: attemptSignIn }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const authContext = useContext(AuthContext);
  if (typeof authContext === 'undefined') {
    throw new Error('use Auth must be used within an AuthProvider');
  }
  return authContext;
}

async function signIn(handleSignIn: (context: IAuthContext) => void) {
  try {
    const res = await axios.get('/api/auth/', {
      withCredentials: true,
    });

    console.log(res.data);

    const { user, authUrl } = res.data;
    handleSignIn({
      authenticated: Boolean(user),
      user,
      authUrl,
    });
  } catch (e) {
    const { authUrl } =
      (e as AxiosError<{ authUrl: string }>)?.response?.data ?? {};

    handleSignIn({
      authenticated: false,
      user: undefined,
      authUrl,
    });
  }
}
