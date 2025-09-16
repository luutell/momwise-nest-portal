-- Inserir conteúdos de Higiene Natural para diferentes faixas etárias e formatos

-- 1. ARTIGOS PILAR POR FAIXA ETÁRIA

-- 0-3 meses: Observação e vínculo
INSERT INTO calendar_contents (
  title,
  description,
  content_type,
  category,
  maternity_phase,
  baby_age_min_days,
  baby_age_max_days,
  duration_minutes,
  day_of_week,
  week_offset,
  is_premium,
  content_data
) VALUES
(
  'Higiene Natural: Primeiros Sinais e Vínculo (0-3m)',
  'Aprenda a observar os sinais sutis do seu bebê e fortaleça o vínculo através da comunicação natural.',
  'article',
  'Higiene Natural',
  'newborn',
  0,
  90,
  5,
  1,
  0,
  false,
  '{
    "expert": "Consultora em Higiene Natural",
    "reading_time": "5 min",
    "benefits": ["Fortalece vínculo", "Reduz assaduras", "Consciência corporal"],
    "challenges": ["Acidentes são normais", "Paciência necessária", "Observação constante"],
    "practical_tips": [
      "Observe expressões faciais antes da eliminação",
      "Tente ofertas após mamadas e sonos",
      "Use sons como pss pss para criar associação",
      "Não se frustre com acidentes - fazem parte do processo"
    ]
  }'
),

-- 4-6 meses: Primeiras tentativas
(
  'Higiene Natural: Primeiras Tentativas Leves (4-6m)',
  'Como introduzir a higiene natural de forma gradual e respeitosa, associando com as rotinas do bebê.',
  'article',
  'Higiene Natural',
  'infant',
  120,
  180,
  6,
  3,
  2,
  false,
  '{
    "expert": "Dra. Mariana Costa - Pediatra",
    "reading_time": "6 min",
    "benefits": ["Estabelece rotina", "Reduz uso de fraldas", "Desenvolve comunicação"],
    "challenges": ["Timing ainda irregular", "Necessita paciência", "Adaptação gradual"],
    "practical_tips": [
      "Ofereça após mamadas regulares",
      "Use penico baixo e confortável",
      "Mantenha rotina de tentativas sem pressão",
      "Celebre pequenos sucessos sem exagero"
    ]
  }'
),

-- 6-12 meses: Sinais mais claros
(
  'Higiene Natural: Sinais Mais Claros (6-12m)',
  'Nesta fase os sinais ficam mais evidentes. Aprenda a reconhecê-los e como associar com a introdução alimentar.',
  'article',
  'Higiene Natural',
  'infant',
  180,
  365,
  7,
  5,
  4,
  false,
  '{
    "expert": "Consultora Camila Reis",
    "reading_time": "7 min",
    "benefits": ["Sinais mais claros", "Consciência corporal", "Menos fraldas sujas"],
    "challenges": ["Distração com brinquedos", "Mudanças na alimentação", "Mobilidade aumenta"],
    "practical_tips": [
      "Observe mudanças com introdução alimentar",
      "Mantenha ofertas regulares mesmo com recusas",
      "Use brinquedos ou livros durante tentativas",
      "Ajuste horários conforme rotina alimentar"
    ]
  }'
),

-- 12-18 meses: Autonomia
(
  'Higiene Natural: Autonomia e Participação Ativa (12-18m)',
  'Seu bebê está mais autônomo! Aprenda como ele pode participar ativamente do processo.',
  'article',
  'Higiene Natural',
  'toddler',
  365,
  540,
  8,
  2,
  6,
  false,
  '{
    "expert": "Educadora Parental Ana Silva",
    "reading_time": "8 min", 
    "benefits": ["Maior autonomia", "Orgulho próprio", "Transição gradual"],
    "challenges": ["Afirmação da vontade", "Distração com ambiente", "Regressões normais"],
    "practical_tips": [
      "Permita que sinalize necessidades",
      "Ensine palavras simples: xixi, cocô",
      "Deixe participar da limpeza (com supervisão)",
      "Mantenha calma durante regressões"
    ]
  }'
);

-- 2. MICRODICAS DIÁRIAS (distribuídas ao longo das semanas)

INSERT INTO calendar_contents (
  title,
  description,
  content_type,
  category,
  maternity_phase,
  baby_age_min_days,
  baby_age_max_days,
  day_of_week,
  week_offset,
  is_premium,
  content_data
) VALUES
(
  'Observe um sinal hoje',
  'Hoje, observe um sinal do seu bebê antes da eliminação e anote para reconhecer padrões.',
  'tip',
  'Higiene Natural',
  'newborn',
  0,
  30,
  2,
  1,
  false,
  '{"action": "Observar e anotar sinais", "time": "2 min"}'
),
(
  'Som de associação',
  'Experimente fazer um som suave como pss pss quando o bebê estiver eliminando.',
  'tip',
  'Higiene Natural',
  'newborn',
  15,
  60,
  4,
  2,
  false,
  '{"action": "Criar associação sonora", "time": "1 min"}'
),
(
  'Momento de conexão',
  'Use as ofertas de higiene natural como momentos especiais de conexão e comunicação.',
  'tip',
  'Higiene Natural',
  'infant',
  60,
  180,
  6,
  3,
  false,
  '{"action": "Praticar conexão", "time": "5 min"}'
),
(
  'Celebre os pequenos sucessos',
  'Quando der certo, celebre com um sorriso e palavras carinhosas, sem exagerar.',
  'tip',
  'Higiene Natural',
  'infant',
  120,
  300,
  1,
  5,
  false,
  '{"action": "Celebrar conquistas", "time": "1 min"}'
),
(
  'Paciência com acidentes',
  'Lembre-se: acidentes fazem parte. Limpe com carinho e sem frustração.',
  'tip',
  'Higiene Natural',
  'toddler',
  300,
  540,
  3,
  7,
  false,
  '{"action": "Praticar paciência", "time": "Todo o tempo necessário"}'
);

-- 3. VÍDEOS CURTOS (1-2 min)

INSERT INTO calendar_contents (
  title,
  description,
  content_type,
  category,
  maternity_phase,
  baby_age_min_days,
  baby_age_max_days,
  duration_minutes,
  day_of_week,
  week_offset,
  is_premium,
  content_data
) VALUES
(
  'Posições Confortáveis para Higiene Natural',
  'Demonstração prática das melhores posições para segurar o bebê durante as ofertas.',
  'video',
  'Higiene Natural',
  'newborn',
  0,
  90,
  2,
  0,
  1,
  false,
  '{
    "expert": "Instrutora Luana Oliveira",
    "demonstration": "Posições práticas e seguras",
    "tips": ["Apoio das costas", "Conforto para ambos", "Segurança sempre"]
  }'
),
(
  'Usando Cue Sounds: Xiiii',
  'Como criar e usar sons de associação para comunicar com seu bebê sobre eliminação.',
  'video',
  'Higiene Natural',
  'infant',
  30,
  180,
  1,
  4,
  3,
  false,
  '{
    "expert": "Consultora Marina Santos",
    "demonstration": "Técnicas de comunicação sonora",
    "sounds": ["Pss pss", "Xiiii", "Sons naturais"]
  }'
),
(
  'Penico e Balde: Uso Lúdico e Prático',
  'Demonstração de como usar penico e balde de forma divertida e sem pressão.',
  'video',
  'Higiene Natural',
  'toddler',
  180,
  540,
  2,
  6,
  5,
  false,
  '{
    "expert": "Educadora Sofia Lima",
    "demonstration": "Uso correto e divertido de equipamentos",
    "equipment": ["Penico baixo", "Balde apropriado", "Limpeza fácil"]
  }'
);

-- 4. CHECKLISTS INTERATIVOS

INSERT INTO calendar_contents (
  title,
  description,
  content_type,
  category,
  maternity_phase,
  baby_age_min_days,
  baby_age_max_days,
  day_of_week,
  week_offset,
  is_premium,
  content_data
) VALUES
(
  'Checklist: Sinais que Observei Hoje',
  'Marque os sinais que você percebeu no seu bebê hoje. Isso ajuda a reconhecer padrões.',
  'activity',
  'Higiene Natural',
  'newborn',
  0,
  120,
  0,
  2,
  false,
  '{
    "type": "checklist",
    "items": [
      "Caretas ou expressões específicas",
      "Sons ou grunhidos",
      "Movimentos de perna",
      "Agitação ou inquietação",
      "Parar de mamar/brincar",
      "Acordar do sono",
      "Nenhum sinal claro hoje"
    ],
    "encouragement": "Cada observação é um aprendizado! Continue observando com carinho."
  }'
),
(
  'Checklist: Minha Prática Semanal',
  'Avalie sua prática de higiene natural esta semana de forma acolhedora.',
  'activity',
  'Higiene Natural',
  'infant',
  60,
  300,
  0,
  4,
  false,
  '{
    "type": "checklist",
    "items": [
      "Ofereci após as mamadas principais",
      "Observei sinais com paciência",
      "Usei sons de associação",
      "Celebrei pequenos sucessos",
      "Mantive calma com acidentes",
      "Senti conexão com meu bebê",
      "Esta semana foi desafiadora"
    ],
    "encouragement": "Você está no caminho certo! Cada família tem seu ritmo."
  }'
);

-- 5. INFOGRÁFICOS / CARDS VISUAIS

INSERT INTO calendar_contents (
  title,
  description,
  content_type,
  category,
  maternity_phase,
  baby_age_min_days,
  baby_age_max_days,
  day_of_week,
  week_offset,
  is_premium,
  content_data
) VALUES
(
  'Card Visual: Sinais por Faixa Etária',
  'Guia visual rápido dos principais sinais de eliminação conforme o bebê cresce.',
  'article',
  'Higiene Natural',
  'general',
  0,
  540,
  5,
  1,
  false,
  '{
    "type": "infographic",
    "age_groups": {
      "0-3 meses": ["Caretas sutis", "Grunhidos leves", "Inquietação"],
      "4-6 meses": ["Sinais mais claros", "Movimentos específicos", "Sons distintos"],
      "6-12 meses": ["Comunicação ativa", "Gestos", "Palavras simples"],
      "12+ meses": ["Verbalização", "Autonomia", "Participação ativa"]
    }
  }'
),
(
  'Card: EC Parcial vs Full-time',
  'Comparação acolhedora entre diferentes abordagens da higiene natural.',
  'article',
  'Higiene Natural',
  'general',
  0,
  540,
  3,
  3,
  false,
  '{
    "type": "comparison",
    "partial_ec": {
      "title": "Higiene Natural Parcial",
      "description": "Ofertas em momentos específicos",
      "benefits": ["Menos pressão", "Mais flexível", "Ideal para iniciantes"],
      "ideal_for": "Famílias que trabalham fora ou querem começar gradualmente"
    },
    "fulltime_ec": {
      "title": "Higiene Natural Integral", 
      "description": "Prática constante e observação contínua",
      "benefits": ["Comunicação intensa", "Menos fraldas", "Conexão profunda"],
      "ideal_for": "Famílias com disponibilidade total e experiência"
    },
    "message": "Não existe certo ou errado - escolha o que funciona para sua família!"
  }'
),
(
  'Card: Benefícios da Higiene Natural',
  'Visualização dos benefícios para bebê, família e meio ambiente.',
  'article',
  'Higiene Natural',
  'general',
  0,
  540,
  1,
  5,
  false,
  '{
    "type": "benefits_card",
    "categories": {
      "Para o bebê": [
        "Pele mais saudável",
        "Menos assaduras", 
        "Consciência corporal",
        "Comunicação precoce"
      ],
      "Para a família": [
        "Vínculo fortalecido",
        "Economia em fraldas",
        "Comunicação não-verbal",
        "Confiança mútua"
      ],
      "Para o meio ambiente": [
        "Menos lixo produzido",
        "Menor impacto ambiental",
        "Consumo consciente",
        "Sustentabilidade"
      ]
    }
  }'
);