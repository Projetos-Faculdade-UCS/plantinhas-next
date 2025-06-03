import { Planta } from '@/shared/types/planta';
import { useEffect, useState, useTransition } from 'react';
import { getHabilidadesAction, searchPlantasAction } from '../actions/plantio.actions';

export function usePlantioInitialData() {
  const [isInitializing, startInitializationTransition] = useTransition();
  const [habilidadesUsuario, setHabilidadesUsuario] = useState<string[]>([]);
  const [listaPlantas, setListaPlantas] = useState<Planta[]>([]);
  const [initializationError, setInitializationError] = useState<string | null>(null);

  useEffect(() => {
    setInitializationError(null);
    startInitializationTransition(async () => {
      const errorMessages: string[] = [];

      const resultHabilidades = await getHabilidadesAction();
      if (resultHabilidades.data) {
        setHabilidadesUsuario(resultHabilidades.data);
      } else if (resultHabilidades.error) {
        console.error("Erro ao buscar habilidades:", resultHabilidades.error);
        errorMessages.push(resultHabilidades.error);
      }

      const resultPlantas = await searchPlantasAction(); // TODO: passar search/pagina se necessário
      if (resultPlantas.data?.itens) {
        setListaPlantas(resultPlantas.data.itens as Planta[]);
      } else if (resultPlantas.error) {
        console.error("Erro ao buscar plantas:", resultPlantas.error);
        errorMessages.push(resultPlantas.error);
      }

      if (errorMessages.length > 0) {
        setInitializationError(errorMessages.join(' '));
      }
    });
  }, []); // Executa uma vez ao montar

  return {
    habilidadesUsuario,
    listaPlantas,
    isLoadingInitialData: isInitializing,
    initialDataError: initializationError,
  };
} 