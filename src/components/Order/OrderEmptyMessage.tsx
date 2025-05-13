import { ArrowLeft, Package } from 'lucide-react'
import { Link } from 'react-router'

export const OrderEmptyMessage = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Package className="w-8 h-8 text-orange-500" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Você ainda não fez nenhum pedido</h2>
                    <p className="text-gray-600 mb-6">Que tal experimentar algo delicioso do nosso cardápio?</p>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Ver cardápio
                    </Link>
                </div>
            </div>
        </div>
    )
}
