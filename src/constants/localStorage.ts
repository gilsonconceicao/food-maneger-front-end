type LocalStorageType = string | undefined; 

export const getAccessTokenLocalStorage: string = localStorage.getItem('accessToken')!;
export const getUserDataInLocalStorage: LocalStorageType = localStorage?.getItem('userData') ?? undefined;
