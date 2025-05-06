import { CurrencyFormField } from "@/components/FormFields/CurrencyFormField"
import { SelectFormField } from "@/components/FormFields/SelectFormField"
import { TextAreaFormField } from "@/components/FormFields/TextAreaFormField"
import { TextFormField } from "@/components/FormFields/TextFormField"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { foodCategories } from "@/services/Foods/Foods.type"

type CreateFoodProps = {
    isModeCreate: boolean;
}

export const CreateFood = ({isModeCreate}: CreateFoodProps) => {
    const { isMobile } = useSidebar()

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
                <TextFormField
                    label="Nome"
                    name="name"
                    placeholder="Nome"
                />
                <TextFormField
                    label="Imagem"
                    name="urlImage"
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
            <div style={{ marginTop: '30px' }} className={isMobile ? "grid" : "flex justify-end items-center"}>

                <Button type="submit" variant='default'>
                    {isModeCreate? 'Adicionar' : 'Atualizar'}
                </Button>
            </div>
        </div>
    )
}
