import { Toaster } from 'react-hot-toast'

export const ToastCustom = () => {
    return (
        <Toaster
            position='top-center'
            gutter={24}
            toastOptions={{
                success: {
                    style: {
                        background: '#014034',
                        color: 'white'
                    },
                    icon: '✅',
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
