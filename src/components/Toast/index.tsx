import { Toaster } from 'react-hot-toast'

export const ToastCustom = () => {
    return (
        <Toaster
            position='top-center'
            gutter={24}
            toastOptions={{
                success: {
                    style: {
                        background: '#1aab26',
                        color: 'white'
                    },
                    iconTheme: {
                        primary: 'green',
                        secondary: 'white',
                      },
                },
                error: {
                    style: {
                        background: 'red',
                        color: 'white'
                    },
                    iconTheme: {
                        primary: 'red',
                        secondary: 'white',
                      },
                },
            }}
        />
    )
}
