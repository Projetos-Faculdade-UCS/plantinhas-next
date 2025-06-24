import { SearchInput } from '@/entities/filtros-plantas/search-input';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Control } from 'react-hook-form';
import { NewPlantioForm } from '../lib/cadastro-plantio.schema';
import { QuantidadeField } from './fields/quantidade-field';
import { SelectPlantaField } from './fields/select-planta-field';
type PokedexProps = {
    control: Control<NewPlantioForm>;
    isBusy?: boolean;
};
export function Pokedex({ control, isBusy = false }: PokedexProps) {
    return (
        <div className="flex">
            <Card className="mt-10 w-fit shrink-0 rounded-r-none border-r-0">
                <SearchInput
                    className="mx-4 w-64"
                    id="search-plant-in-pokedex"
                    onChange={(val) => console.log(val)}
                    placeholder="Buscar planta"
                />
                <CardContent className="space-y-6"></CardContent>
            </Card>
            <Card className="grow rounded-l-none border-l-0">
                <CardHeader>
                    <CardTitle>Plantas Cadastradas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <SelectPlantaField control={control} disabled={isBusy} />
                    <QuantidadeField control={control} disabled={isBusy} />
                </CardContent>
            </Card>
        </div>
    );
}
