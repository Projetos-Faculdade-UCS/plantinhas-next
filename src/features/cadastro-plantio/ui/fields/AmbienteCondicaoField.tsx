import { Prateleira } from '@/entities/prateleira';
import { FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Control } from 'react-hook-form';
import { NewPlantioForm } from '../../lib/cadastro-plantio.schema';
import { OpcaoCultivoButton } from '../opcao-cultivo-button';

const condicoesPlantio = [
    { value: 'externo', label: 'Externo' },
    { value: 'interno', label: 'Interno' },
    { value: 'semi-protegido', label: 'Semi-protegido' },
    { value: 'comunitario', label: 'Comunitário' },
];

interface AmbienteCondicaoFieldProps {
    control: Control<NewPlantioForm>;
    disabled: boolean;
}

export function AmbienteCondicaoField({
    control,
    disabled,
}: AmbienteCondicaoFieldProps) {
    return (
        <FormField
            control={control}
            name="ambiente.condicao"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="px-2 text-base font-semibold">
                        Condições do Ambiente
                    </FormLabel>
                    <Prateleira alwaysShowArrows={false} gap="1rem">
                        {condicoesPlantio.map((opcao) => (
                            <OpcaoCultivoButton
                                key={opcao.label}
                                opcao={opcao}
                                value={field.value}
                                onChange={field.onChange}
                                disabled={disabled}
                            />
                        ))}
                    </Prateleira>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
