import { Planta } from '@/shared/types/planta';
import { useEffect, useState, useTransition } from 'react';
import { getPlantaAction } from '../actions/plantio.actions';

export function usePlantaDetalhes(plantaId: string | undefined | null) {
  const [isFetchingDetalhes, startFetchingDetalhesTransition] = useTransition();
  const [plantaSelecionadaDetalhes, setPlantaSelecionadaDetalhes] = useState<Planta | null>(null);
  const [fetchDetalhesError, setFetchDetalhesError] = useState<string | null>(null);

  useEffect(() => {
    if (plantaId) {
      setFetchDetalhesError(null);
      startFetchingDetalhesTransition(async () => {
        const resultPlanta = await getPlantaAction(Number(plantaId));
        if (resultPlanta.data) {
          setPlantaSelecionadaDetalhes(resultPlanta.data);
        } else {
          setPlantaSelecionadaDetalhes(null);
          if (resultPlanta.error) {
            console.error("Erro ao buscar detalhes da planta:", resultPlanta.error);
            setFetchDetalhesError(resultPlanta.error);
          }
        }
      });
    } else {
      setPlantaSelecionadaDetalhes(null);
      // Não definimos erro aqui, pois plantaId nulo é um estado válido (nenhuma planta selecionada)
      // setFetchDetalhesError(null); // Garante que erros antigos sejam limpos se o ID for removido
    }
  }, [plantaId]);

  return {
    plantaSelecionadaDetalhes,
    isLoadingDetalhes: isFetchingDetalhes,
    detalhesError: fetchDetalhesError,
  };
} 