type LocalStorageType = string | undefined; 

export const getAccessTokenLocalStorage: LocalStorageType = localStorage.getItem('accessToken') ?? undefined;
export const getUserDataInLocalStorage: LocalStorageType = localStorage.getItem('userData') ?? undefined;
