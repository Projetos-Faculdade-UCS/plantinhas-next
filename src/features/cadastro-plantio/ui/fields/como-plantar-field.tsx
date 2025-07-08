import { Prateleira } from '@/entities/prateleira';
import { FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Control } from 'react-hook-form';
import { NewPlantioForm } from '../../lib/cadastro-plantio.schema';
import { OpcaoCultivoButton } from '../opcao-cultivo-button';

const opcoes = [
    {
        foto: '/assets/form-plantio/vaso.png',
        label: 'Vaso',
        value: 'vaso de flor',
    },
    {
        foto: '/assets/form-plantio/canteiro.png',
        label: 'Canteiro',
        value: 'canteiro',
    },
    {
        foto: '/assets/form-plantio/espaldeiras.png',
        label: 'Espaldeiras',
        value: 'espaldeira',
    },
    {
        foto: '/assets/form-plantio/caixa-cultivo.png',
        label: 'Caixa',
        value: 'caixa de cultivo',
    },
    {
        label: 'Outros',
        value: 'outros',
    },
];

type ComoPlantarProps = {
    control: Control<NewPlantioForm>;
    isBusy?: boolean;
};
export function ComoPlantarField({ control, isBusy }: ComoPlantarProps) {
    return (
        <FormField
            control={control}
            name="sistemaCultivo"
            render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                    <FormLabel className="px-2 text-base font-semibold">
                        Como Plantar?
                    </FormLabel>
                    <Prateleira alwaysShowArrows={true} gap="1rem">
                        {opcoes.map((opcao) => (
                            <OpcaoCultivoButton
                                key={opcao.label}
                                opcao={opcao}
                                value={field.value}
                                onChange={field.onChange}
                                disabled={isBusy}
                            />
                        ))}
                    </Prateleira>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
