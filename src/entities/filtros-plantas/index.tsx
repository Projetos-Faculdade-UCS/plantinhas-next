'use client';
import { Button } from '@/shared/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { TFiltrosPlanta } from './types';

export function FiltrosPlanta() {
    const router = useRouter();
    const path = usePathname();
    const params = useSearchParams();
    const formData = useForm<TFiltrosPlanta>({
        defaultValues: {
            search: params.get('search') || '',
        },
    });

    function handleSubmit(data: TFiltrosPlanta) {
        const params = new URLSearchParams();
        Object.entries(data).forEach(([key, value]) => {
            if (value) {
                params.append(key, value);
            }
        });
        router.replace(`${path}?${params.toString()}`);
    }

    return (
        <Form {...formData}>
            <form
                onSubmit={formData.handleSubmit(handleSubmit)}
                className="flex items-center gap-2"
            >
                <FormField
                    control={formData.control}
                    name="search"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        handleSubmit(formData.getValues());
                                    }}
                                    type="text"
                                    placeholder="Buscar planta"
                                    className="bg-card w-full max-w-[300px] text-base"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="button" variant="default" className="px-2">
                    <i className="ph ph-funnel text-xl" />
                </Button>
            </form>
        </Form>
    );
}
