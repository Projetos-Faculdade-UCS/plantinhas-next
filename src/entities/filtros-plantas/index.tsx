'use client';
import { Button } from '@/shared/ui/button';
import { Form } from '@/shared/ui/form';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { SearchInputField } from './search-input-field';
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
                <SearchInputField
                    control={formData.control}
                    onClear={() => formData.handleSubmit(handleSubmit)()}
                />
                <Button type="button" variant="default" className="px-2">
                    <i className="ph ph-funnel text-xl" />
                </Button>
            </form>
        </Form>
    );
}
