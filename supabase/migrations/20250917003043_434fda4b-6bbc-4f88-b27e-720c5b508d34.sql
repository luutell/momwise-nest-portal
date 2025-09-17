-- Primeiro, remover os posts antigos da categoria Higiene Natural
DELETE FROM posts WHERE category = 'Higiene Natural';

-- 1. ARTIGOS PILAR POR FAIXA ETÁRIA (4 artigos principais)

-- Artigo 0-3 meses
INSERT INTO posts (title, content, introduction, author, category, published, language) VALUES (
'Higiene Natural: Primeiros Sinais (0-3 meses)', 
'A higiene natural com bebês de 0 a 3 meses é sobre observação amorosa e construção de vínculo. Nesta fase inicial, seu bebê já comunica suas necessidades através de sinais sutis que podem ser reconhecidos com paciência e atenção.

**Sinais Sutis a Observar:**
- Caretas ou expressões faciais específicas
- Movimentos de pernas ou agitação antes da eliminação
- Sons característicos (grunhidos suaves, suspiros)
- Padrões relacionados à amamentação (geralmente elimina durante ou logo após)

**Benefícios Nesta Fase:**
- **Pele saudável**: Menos tempo em contato com dejetos reduz assaduras
- **Vínculo fortalecido**: A atenção constante aos sinais desenvolve conexão profunda
- **Consciência corporal**: Bebê começa a associar sensações com ações

**Desafios Realistas:**
- Nem sempre conseguiremos captar todos os sinais - e tudo bem!
- Noites são mais desafiadoras, não se pressione
- Cada bebê tem ritmos únicos, respeite o tempo do seu

**Orientações Práticas Sem Pressão:**
- Comece observando por 10-15 minutos após as mamadas
- Use um paninho ou fralda de pano durante a observação
- Anote horários e sinais para identificar padrões
- Celebre pequenas "capturas", mesmo que sejam poucas

**Lembre-se:** Acidentes fazem parte do processo. O importante é o vínculo e a consciência que você está desenvolvendo juntos. Não há pressa - cada dupla mãe-bebê encontra seu próprio ritmo.',

'Descubra como observar os primeiros sinais do seu bebê e fortalecer o vínculo através da higiene natural amorosa e respeitosa.',
'Dra. Marina Santos - Consultora em Higiene Natural',
'Higiene Natural',
true,
'pt'
);

-- Artigo 4-6 meses  
INSERT INTO posts (title, content, introduction, author, category, published, language) VALUES (
'Primeiras Tentativas Leves (4-6 meses)',
'Entre 4 e 6 meses, seu bebê desenvolve maior consciência corporal e os sinais ficam mais claros. É o momento ideal para introduzir tentativas leves e criar associações positivas com rotinas previsíveis.

**Sinais Mais Claros Nesta Fase:**
- Parada súbita durante brincadeiras
- Olhar direcionado ou busca por contato visual
- Sons mais definidos antes da eliminação
- Maior regularidade nos horários (especialmente após sonecas)

**Criando Rotinas Previsíveis:**
- Ofereça penico ou balde após acordar
- Associe eliminação com palavras ou sons específicos ("xixi", "cocô")
- Use o mesmo local quando possível
- Mantenha o ambiente calmo e acolhedor

**Benefícios Crescentes:**
- **Menos assaduras**: Pele mais protegida e saudável
- **Economia**: Redução significativa no uso de fraldas
- **Desenvolvimento motor**: Posições variadas estimulam musculatura

**Desafios Desta Fase:**
- Distrações aumentam - bebê quer explorar o mundo
- Dentição pode alterar padrões temporariamente
- Saídas de casa exigem planejamento extra

**Estratégias Flexíveis:**
- Higiene natural apenas em casa é válida
- Use fraldas durante saídas sem culpa
- Adapte horários conforme a rotina familiar
- Comemore progressos, por menores que sejam

**Dica Especial:** Se hoje não funcionou, amanhã é um novo dia. A flexibilidade é sua maior aliada nesta jornada.',

'Aprenda estratégias suaves para introduzir a higiene natural quando os sinais do bebê ficam mais claros e previsíveis.',
'Dra. Marina Santos - Consultora em Higiene Natural', 
'Higiene Natural',
true,
'pt'
);

-- Artigo 6-12 meses
INSERT INTO posts (title, content, introduction, author, category, published, language) VALUES (
'Sinais Claros e Introdução Alimentar (6-12 meses)',
'Dos 6 aos 12 meses, a higiene natural ganha nova dimensão com a introdução alimentar. Os sinais ficam mais óbvios e você pode criar conexões entre alimentação, eliminação e autonomia crescente do bebê.

**Conexão com Alimentação:**
- Eliminação frequentemente ocorre 15-30 minutos após refeições
- Novos alimentos podem alterar consistência e frequência
- Horários de refeição ajudam a prever necessidades
- Fibras naturais facilitam reconhecimento de padrões

**Sinais Mais Óbvios:**
- Bebê para atividades completamente
- Procura colo ou posição específica
- Vocalizações direcionadas aos pais
- Gestos ou apontamentos para penico/banheiro

**Desenvolvendo Autonomia:**
- Deixe bebê ver você usando o banheiro
- Permita exploração segura do penico
- Use palavras consistentes para eliminação
- Elogie tentativas, independente do resultado

**Benefícios Ampliados:**
- **Consciência corporal avançada**: Bebê reconhece sensações internas
- **Comunicação não-verbal**: Fortalece linguagem corporal
- **Sustentabilidade**: Impacto ambiental reduzido significativamente

**Desafios Comuns:**
- Marcos de desenvolvimento podem alterar padrões
- Mobilidade crescente traz distrações
- Doenças ou dentição afetam rotinas temporariamente

**Estratégias Adaptáveis:**
- Higiene natural parcial (apenas em períodos acordado)
- Combine com fraldas ecológicas quando necessário
- Mantenha flexibilidade durante viagens
- Envolva outros cuidadores gradualmente

**Lembrança Importante:** Cada bebê desenvolve no seu tempo. Respeite sinais de resistência e ajuste expectativas conforme necessário.',

'Descubra como a introdução alimentar se conecta naturalmente com a higiene natural e fortalece a autonomia do bebê.',
'Dra. Marina Santos - Consultora em Higiene Natural',
'Higiene Natural', 
true,
'pt'
);

-- Artigo 12-18 meses
INSERT INTO posts (title, content, introduction, author, category, published, language) VALUES (
'Autonomia e Participação Ativa (12-18 meses)',
'Entre 12 e 18 meses, seu bebê torna-se participante ativo na higiene natural. É o momento de celebrar conquistas, navegar pela teimosia natural da idade e manter flexibilidade durante marcos de desenvolvimento.

**Participação Ativa do Bebê:**
- Caminha até o penico quando sente necessidade
- Comunica verbalmente ("xixi", "cocô") ou por gestos
- Ajuda a tirar/colocar roupas
- Demonstra orgulho das próprias conquistas

**Navegando a Fase de Autonomia:**
- Ofereça escolhas: "Penico ou vaso?" "Agora ou daqui 5 minutos?"
- Mantenha rotinas flexíveis mas consistentes
- Use livros ilustrados sobre higiene natural
- Transforme momentos em brincadeiras positivas

**Marcos de Desenvolvimento e Ajustes:**
- Regressões durante aquisição da fala são normais
- Mudanças na rotina podem afetar padrões temporariamente
- Sono noturno geralmente ainda requer fraldas
- Transições (creche, mudanças) exigem paciência extra

**Benefícios Consolidados:**
- **Independência crescente**: Reduz dependência de fraldas significativamente
- **Autoestima**: Conquistas geram confiança e orgulho
- **Comunicação avançada**: Verbalização de necessidades se fortalece

**Superando Desafios Comuns:**
- **"Não quero!**": Respeite momentos de resistência, ofereça novamente depois
- **Acidentes públicos**: Tenha sempre muda de roupa e mantenha calma
- **Pressão social**: Lembre-se que cada família escolhe seu caminho

**Estratégias Para Esta Fase:**
- Celebre pequenas vitórias diariamente
- Mantenha fraldas como backup sem culpa
- Envolva bebê na limpeza após acidentes (sem punição)
- Conecte-se com outras famílias praticantes

**Reflexão Final:** Você chegou longe! A higiene natural não é sobre perfeição, mas sobre conexão, sustentabilidade e respeito ao ritmo natural do desenvolvimento.',

'Celebre a crescente autonomia do seu bebê e navegue esta fase de participação ativa com confiança e flexibilidade.',
'Dra. Marina Santos - Consultora em Higiene Natural',
'Higiene Natural',
true, 
'pt'
);

-- 2. MICRODICAS DIÁRIAS (12 microdicas)

INSERT INTO posts (title, content, introduction, author, category, published, language) VALUES (
'Microdica: Observe Um Sinal Hoje',
'Hoje, escolha apenas um momento para observar atentamente seu bebê antes de uma possível eliminação. Pode ser após acordar, durante a amamentação ou depois de uma refeição. Anote mentalmente ou no papel que sinal você percebeu - mesmo que seja sutil como uma mudança na respiração.',
'Ação simples: dedique 5 minutos para observar conscientemente um sinal do seu bebê.',
'Equipe Higiene Natural',
'Higiene Natural',
true,
'pt' 
);

INSERT INTO posts (title, content, introduction, author, category, published, language) VALUES (
'Microdica: Palavra Carinhosa',
'Escolha uma palavra ou som que você usará consistentemente durante os momentos de eliminação - pode ser "xixi", "ahhh" ou qualquer som que soe natural para você. Use-a suavemente sempre que oferecer penico ou perceber sinais. A repetição amorosa cria associações positivas.',
'Ação simples: defina sua palavra especial para acompanhar momentos de higiene natural.',
'Equipe Higiene Natural', 
'Higiene Natural',
true,
'pt'
);

INSERT INTO posts (title, content, introduction, author, category, published, language) VALUES (
'Microdica: Celebre o Pequeno',
'Quando conseguir captar uma eliminação hoje - mesmo que por acaso - faça uma pequena celebração. Um sorriso genuíno, um "muito bem!" carinhoso ou até uma dancinha boba. Celebrar cria memórias positivas e fortalece a conexão entre vocês.',
'Ação simples: celebre qualquer "captura" com alegria genuína, por menor que seja.',
'Equipe Higiene Natural',
'Higiene Natural', 
true,
'pt'
);

INSERT INTO posts (title, content, introduction, author, category, published, language) VALUES (
'Microdica: Respiração Consciente',
'Durante um momento de observação hoje, respire profundamente e esteja presente. Quando estamos relaxadas, captamos melhor os sinais sutis. Se não conseguir captar nada, também está tudo bem - o momento de presença já tem valor imenso.',
'Ação simples: use a respiração para se conectar ao momento presente durante a observação.',
'Equipe Higiene Natural',
'Higiene Natural',
true,
'pt'
);

-- Adicionando mais 8 microdicas...
INSERT INTO posts (title, content, introduction, author, category, published, language) VALUES (
'Microdica: Penico Sempre Visível',
'Deixe o penico em um local fixo e acessível hoje. Mesmo que não use, a presença visual ajuda você e seu bebê a criarem familiaridade com o objeto. Local ideal: próximo ao trocador ou no banheiro, sempre ao alcance.',
'Ação simples: posicione o penico em local fixo e de fácil acesso para criar familiaridade.',
'Equipe Higiene Natural',
'Higiene Natural',
true,
'pt'
);

INSERT INTO posts (title, content, introduction, author, category, published, language) VALUES (
'Microdica: Horário Pós-Soneca',
'Ofereça penico imediatamente após seu bebê acordar de sonecas hoje. Este é um dos momentos mais previsíveis para eliminação. Mesmo que não aconteça nada, você está criando uma rotina suave que seu bebê começará a reconhecer.',
'Ação simples: sempre ofereça penico logo após despertar de sonecas.',
'Equipe Higiene Natural', 
'Higiene Natural',
true,
'pt'
);

INSERT INTO posts (title, content, introduction, author, category, published, language) VALUES (
'Microdica: Acidentes São Aprendizado',
'Se acontecer um acidente hoje, respire fundo e limpe com tranquilidade. Diga algo como "não tem problema, vamos limpar juntos". Sua reação calma ensina que eliminação é natural e que erros fazem parte do processo.',
'Ação simples: reaja a acidentes com calma e transforme limpeza em momento de aprendizado.',
'Equipe Higiene Natural',
'Higiene Natural', 
true,
'pt'
);

INSERT INTO posts (title, content, introduction, author, category, published, language) VALUES (
'Microdica: Momento Sem Fralda',
'Reserve 15 minutos hoje para deixar seu bebê sem fralda em ambiente seguro. Pode ser durante troca, no banho ou brincadeira. Observe como ele reage e se consegue perceber algum sinal de eliminação sem a fralda.',
'Ação simples: proporcione 15 minutos livres de fralda para observação natural.',
'Equipe Higiene Natural',
'Higiene Natural',
true,
'pt'
);

INSERT INTO posts (title, content, introduction, author, category, published, language) VALUES (
'Microdica: Padrão Alimentar',
'Anote hoje os horários das refeições e quando percebre eliminações. Muitos bebês eliminam consistentemente 15-30 minutos após se alimentar. Identificar esse padrão pode ser sua maior ferramenta de sucesso.',
'Ação simples: observe e anote conexão entre horários de alimentação e eliminação.',
'Equipe Higiene Natural',
'Higiene Natural',
true,
'pt'
);

INSERT INTO posts (title, content, introduction, author, category, published, language) VALUES (
'Microdica: Envolva o Parceiro',
'Convide seu parceiro/a para observar sinais com você hoje, mesmo que por 10 minutos. Compartilhar a experiência fortalece apoio mútuo e seu bebê se beneficia de mais pessoas atentas aos seus sinais.',
'Ação simples: inclua outro cuidador na observação para ampliar rede de apoio.',
'Equipe Higiene Natural',
'Higiene Natural', 
true,
'pt'
);

INSERT INTO posts (title, content, introduction, author, category, published, language) VALUES (
'Microdica: Gratidão Diária',
'Antes de dormir hoje, agradeça por um momento positivo relacionado à higiene natural - pode ser um sinal que percebeu, um sorriso do bebê ou simplesmente sua dedicação em tentar. Gratidão fortalece nossa motivação.',
'Ação simples: pratique gratidão por pequenos progressos na jornada da higiene natural.',
'Equipe Higiene Natural',
'Higiene Natural',
true,
'pt'
);

INSERT INTO posts (title, content, introduction, author, category, published, language) VALUES (
'Microdica: Flexibilidade é Força',
'Se hoje não conseguiu praticar higiene natural, respire e se perdoe. Não há julgamento - cada dia é novo. Flexibilidade não é desistência, é sabedoria. Amanhã você pode tentar novamente, sem culpa ou pressão.',
'Ação simples: pratique autocompaixão e lembre-se que flexibilidade é parte da jornada.',
'Equipe Higiene Natural',
'Higiene Natural',
true,
'pt'
);