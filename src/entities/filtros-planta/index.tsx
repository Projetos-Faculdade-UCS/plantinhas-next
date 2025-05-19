'use client';
import { Button } from '@/shared/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

type FiltrosPlanta = {
    search: string;
};

export function FiltrosPlanta() {
    const params = useSearchParams();
    const formData = useForm<FiltrosPlanta>({
        defaultValues: {
            search: params.get('search') || '',
        },
    });

    function handleSubmit(data: FiltrosPlanta) {
        console.log(data);
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
                                    className="bg-card w-full max-w-[300px]"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="button" variant="default">
                    <i className="ph ph-filter text-xl" />
                </Button>
            </form>
        </Form>
    );
}
