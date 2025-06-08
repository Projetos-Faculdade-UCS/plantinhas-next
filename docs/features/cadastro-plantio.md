# Cadastro de um plantio
- [ ] criar formulário
    - [ ] select de planta
        - [ ] vem pré preenchido se `searchParams` tiver `plantaId` 
    - [ ] NumberField de quantidade
        ![Image](https://github.com/user-attachments/assets/b03070ac-5f05-43b1-bb01-cb90fe83b27b)
    - [ ] Select 'Onde plantar?'
        - Quintal, sacada, estufa, rua, quarto, sala de estar, banheiro, cobertura, outro
        ![Image](https://github.com/user-attachments/assets/c1b16b2d-c153-4afa-ae88-8299674d2e9e)
    - [ ] Select 'Condições'
        - Externo, interno, semi-protegido, comunitário
    - [ ] select 'Como plantar?'
        - Vaso de flor, canteiro, caixa de cultivo, Canteiro elevado, horta vertical, espaldeira, outros
    - [ ] Input de texto
    - [ ] puxar níveis das habilidades do usuario automaticamete
- [ ] enviar dados para IA
    ```json
     {
      "data_inicio_plantio": "2025-05-20",
      "planta": {
        "nome_cientifico": "pimenta dedo de moça",
        "solo_ideal": "Solo bem drenado e fértil",
        "ventilacao": "ar livre",
        "epoca_plantio": "primavera",
        "temperatura_ideal": "20-30°C",
        "dias_maturidade": 0
      },
      "quantidade": 10,
      "ambiente": {
        "local": "varanda",
        "condicao": "externo"
      },
      "sistemaCultivo": "vaso de flor",
      "informacoes_adicionais": "Use fertilizante orgânico a cada duas semanas.",
      "habilidades_existentes": [
        "Habilidade em jardinagem",
        "Conhecimento sobre plantas aromáticas"
       ]
     }
    ```
- [ ] printar o retorno da IA

Observações:
- Pericias foram abortadas