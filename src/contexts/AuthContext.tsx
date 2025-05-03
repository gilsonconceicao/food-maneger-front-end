/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import firebaseApp from "@/Firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User
} from "firebase/auth";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode
} from "react";
import toast from "react-hot-toast";
import {
  failureErrorMehtodsFirebase,
  FirebaseAuthErrorType
} from "@/helpers/Methods";

export type CreateUserFirebaseType = {
  email: string;
  password: string;
  displayName: string;
  phoneNumber: string;
};

type AuthContextType = {
  createUserAsync: (user: CreateUserFirebaseType, handleSuccess?: () => void) => void;
  signUserAsync: (email: string, password: string, handleSuccess?: () => void, isCreate?: boolean) => void;
  logoutUserAsync: (handleSuccess?: () => void) => void;
  sendPasswordResetEmailAsync: (email: string, handleSuccess?: () => void) => void;
  user: {
    name?: string;
    token?: string;
    userId?: string;
    email?: string;
  } | null;
  isLoading: boolean;
  token?: string;
  isAuthenticated: boolean;
  isLoadingUserData: boolean;
};

const Context = createContext<AuthContextType>({
  createUserAsync: () => {},
  signUserAsync: () => {},
  logoutUserAsync: () => {},
  sendPasswordResetEmailAsync: () => {},
  user: null,
  isLoading: false,
  token: undefined,
  isAuthenticated: false,
  isLoadingUserData: false
});

const getUserDataOnStorage = () => {
  const localStorageData = localStorage.getItem('userData'); 
  if (localStorageData !== null) {
    const user = JSON.parse(localStorageData);
    return user;
  } else {
    return null; 
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = getAuth(firebaseApp);
  auth.useDeviceLanguage();
  const getAccessTokenStorage = localStorage.getItem('accessToken') ?? undefined;
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUserData, setIsLoadingUserData] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(getUserDataOnStorage());
  const [accessToken, setAccessToken] = useState<string | undefined>(
    localStorage.getItem('accessToken') ?? undefined
  );
  const [isAuthenticated, setIsAuthenticated] = useState(!!getAccessTokenStorage);

  const cleanState = () => {
    setCurrentUser(null);
    setAccessToken(undefined);
    setIsAuthenticated(false);
    setIsLoading(false);
    localStorage.removeItem('accessToken'); 
    localStorage.removeItem('userData'); 
  };

  const handleAuthError = (error: FirebaseAuthErrorType) => {
    failureErrorMehtodsFirebase(error);
    setIsLoading(false);
  };

  const getIdTokenAsync = async (user: User) => {
    try {
      const token = await user.getIdToken(true);
      setAccessToken(token);
      localStorage.setItem('accessToken', token); 
      return token;
    } catch (error) {
      console.error("Erro ao obter ID token:", error);
      return undefined;
    }
  };

  const createUserAsync = async (user: CreateUserFirebaseType, handleSuccess?: () => void) => {
    setIsLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, user.email, user.password);
      await updateProfile(response.user, {
        displayName: user.displayName
      });
      await signUserAsync(user.email, user.password, handleSuccess, true);
    } catch (error) {
      handleAuthError(error as FirebaseAuthErrorType);
    } finally {
      setIsLoading(false);
    }
  };

  const signUserAsync = async (email: string, password: string, handleSuccess?: () => void, isCreate = false) => {
    setIsLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const token = await getIdTokenAsync(response.user);
      setCurrentUser(response.user);
      localStorage.setItem('userData', JSON.stringify(response.user)); 
      setIsAuthenticated(true);
      setAccessToken(token);

      toast.success(
        isCreate ? 'Conta criada com sucesso!' : 'Login realizado com sucesso!'
      );
      handleSuccess?.();
    } catch (error) {
      handleAuthError(error as FirebaseAuthErrorType);
    } finally {
      setIsLoading(false);
    }
  };

  const sendPasswordResetEmailAsync = async (email: string, handleSuccess?: () => void) => {
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Link de redefinição de senha enviado para seu e-mail.');
      handleSuccess?.();
    } catch (error) {
      handleAuthError(error as FirebaseAuthErrorType);
    } finally {
      setIsLoading(false);
    }
  };

  const logoutUserAsync = async (handleSuccess?: () => void) => {
    setIsLoading(true);
    try {
      await signOut(auth);
      toast.success('Você saiu da sua conta com sucesso.');
      cleanState();
      handleSuccess?.();
    } catch (error) {
      handleAuthError(error as FirebaseAuthErrorType);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(async (user) => {
      if (user) {
        setCurrentUser(user);
        localStorage.setItem('userData', JSON.stringify(user));
        const token = await getIdTokenAsync(user);
        setAccessToken(token);
        setIsAuthenticated(true);
      } else {
        cleanState();
      }
      setIsLoadingUserData(false);
    });

    return () => unsubscribe();
  }, []);

  const contextValue: AuthContextType = {
    createUserAsync,
    signUserAsync,
    logoutUserAsync,
    sendPasswordResetEmailAsync,
    isLoading,
    user: currentUser
      ? {
          name: currentUser.displayName ?? undefined,
          email: currentUser.email ?? undefined,
          userId: currentUser.uid,
          token: accessToken
        }
      : null,
    token: accessToken,
    isAuthenticated,
    isLoadingUserData
  };

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
}

export function useAuthContext() {
  return useContext(Context);
}
