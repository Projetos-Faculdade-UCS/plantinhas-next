import { Prateleira } from '@/entities/prateleira';
import { FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Control } from 'react-hook-form';
import { NewPlantioForm } from '../../lib/cadastro-plantio.schema';
import { OpcaoCultivoButton } from '../opcao-cultivo-button';

const opcoes = [
    {
        foto: '/assets/form-plantio/quintal.png',

        value: 'quintal',
        label: 'Quintal',
    },
    {
        foto: '/assets/form-plantio/estufa.png',
        value: 'estufa',
        label: 'Estufa',
    },
    {
        foto: '/assets/form-plantio/banheiro.png',

        value: 'banheiro',
        label: 'Banheiro',
    },
    {
        foto: '/assets/form-plantio/rua.png',
        value: 'rua',
        label: 'Rua',
    },
    {
        foto: '/assets/form-plantio/dentro-de-casa.png',
        value: 'dentro de casa',
        label: 'Dentro de casa',
    },
    // { value: 'sacada', label: 'Sacada' },
    // { value: 'cobertura', label: 'Cobertura' },
    { value: 'outro', label: 'Outros' },
];

interface AmbienteLocalFieldProps {
    control: Control<NewPlantioForm>;
    isBusy: boolean;
}

export function OndePlantarField({ control, isBusy }: AmbienteLocalFieldProps) {
    return (
        <FormField
            control={control}
            name="ambiente"
            render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                    <FormLabel className="px-2 text-base font-semibold">
                        Onde Plantar?
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
