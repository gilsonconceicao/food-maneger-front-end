
type FailureErrorProps = {
    error: Error
}

export const FailureError = ({error}: FailureErrorProps) => {
    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                    <p className="font-medium">Não foi possível carregar seus pedidos</p>
                    <p className="text-sm mt-1">{error.message}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-2 text-sm bg-white border border-red-200 px-3 py-1 rounded-md hover:bg-red-50 transition-colors"
                    >
                        Tentar novamente
                    </button>
                </div>
            </div>
        </div>
    )
}
