import { CurrencyFormField } from "@/components/FormFields/CurrencyFormField"
import { SelectFormField } from "@/components/FormFields/SelectFormField"
import { TextAreaFormField } from "@/components/FormFields/TextAreaFormField"
import { TextFormField } from "@/components/FormFields/TextFormField"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { useFormContext } from "@/contexts/FormContext"
import { foodCategories } from "@/services/Foods/Foods.type"
import { PlusIcon, RefreshCw, Trash } from "lucide-react"
import { Link } from 'react-router'

type UpInsertFoodProps = {
    isModeCreate: boolean;
    onDeleteFood: () => void;
}

export const UpInsertFood = ({ isModeCreate, onDeleteFood }: UpInsertFoodProps) => {
    const { watch } = useFormContext()
    const { isMobile } = useSidebar();
    const nameValue = watch('name') ?? undefined
    const editOrAddTextDisplay = isModeCreate ? 'Adicionar' : 'Atualizar';

    return (
        <div>
            <div className="mb-5">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-4xl">{editOrAddTextDisplay} comida</h1>
                <p className="leading-4 [&:not(:first-child)]:mt-3">
                    Menu exclusivo para (admin) do sistema. Utilize com responsabilidade.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
                <TextFormField
                    label="Nome"
                    name="name"
                    placeholder="Nome"
                />
                <TextFormField
                    label="Imagem"
                    name="url"
                    placeholder="Link da imagem"
                />
                <CurrencyFormField
                    label="Preço"
                    name="price"
                    placeholder="Preço"
                />
                <SelectFormField
                    name="category"
                    label="Categoria"
                    placeholder="Selecione..."
                    options={foodCategories}
                />
                <TextAreaFormField
                    label="Descrição"
                    name="description"
                    placeholder="Descrição"
                />
            </div>

            <Link to={nameValue !== undefined ? `https://www.pexels.com/pt-br/procurar/${nameValue}/` : 'https://www.pexels.com/pt-br'} className="block text-blue-400 mt-5 mb-2"  target="_blank">Referência para imagens</Link>
            <div style={{ marginTop: '30px', gap: 20}} className={isMobile ? "grid" : "flex justify-end items-center"}>

                <Button variant='destructive' type="button" onClick={onDeleteFood} disabled={isModeCreate} className="cursor-pointer">
                    <Trash className="w-4 h-4" />
                    Excluir
                </Button>

                <Button type="submit" variant='default'   className="cursor-pointer">
                    {isModeCreate ? <PlusIcon className="w-4 h-4" /> : <RefreshCw className="w-4 h-4" />}
                    {editOrAddTextDisplay}
                </Button>
            </div>
        </div>
    )
}
