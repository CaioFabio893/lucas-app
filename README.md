# Lucas · Hardgainer 6 semanas

Aplicativo estático para a ficha ABCD de hipertrofia: 25 exercícios, demonstrações em vídeo, cronômetro de descanso por exercício e registro de carga/repetições/anotações.

## Organização

São 30 sessões (5 por semana, durante 6 semanas). A sequência A → B → C → D continua entre as semanas: a primeira é A/B/C/D/A; a segunda, B/C/D/A/B. Cada sessão tem registros próprios, inclusive repetições do mesmo treino na mesma semana.

Os exercícios, séries, faixas e descansos seguem a ficha fornecida. Drop-set/rest-pause são lembretes da última série; suas pausas internas e parâmetros não foram inventados. A progressão usa repetições e carga, sem percentuais de PR compartilhados entre exercícios.

Nos unilaterais, os lados são registrados separadamente e uma série só aparece concluída após ambos. A opção principal da puxada é unilateral; a alternativa neutra é descrita na ficha, sem mudar automaticamente a modalidade de registro. Para realizá-la bilateral, registre o mesmo resultado em ambos os lados e anote a variante.

## Vídeos e descanso

Todos os exercícios têm um vídeo incorporável, carregado somente ao tocar em **Assistir aqui**, e links diretos à fonte. Vídeos podem estar em inglês; sua disponibilidade e permissão de reprodução dependem das fontes externas. Se um player estiver indisponível, use o link demonstrativo.

O descanso permite iniciar, pausar, retomar, reiniciar, ajustar 15 segundos e escolher os limites das faixas. Um cronômetro fica ativo por vez; os demais são pausados. A contagem usa o horário real para compensar atrasos ao trocar de aba. O estado do cronômetro permanece durante a navegação do app, mas reinicia ao recarregar a página. O som é opcional; celulares podem suspender áudio/execução ao bloquear a tela.

## Registros

Dados ficam no armazenamento local deste navegador/dispositivo, sem conta ou sincronização. A nova ficha usa o prefixo `hg6_v1_` e não sobrescreve as chaves do programa antigo. Limpar os dados do site apaga os registros. A identidade do ciclo é fixa: reutilizar as mesmas 30 sessões altera seus registros.

## Executar e verificar

Não requer instalação de dependências nem etapa de compilação. Abra `index.html` ou sirva a pasta com um servidor estático.

Teste de ficha, calendário, sanitização e progressão: `node --test tests/training.test.js`.

## GitHub Pages

Publique a raiz da branch `main` em **Settings → Pages → Deploy from a branch → main / (root)**. Os caminhos são relativos e funcionam em `/lucas-app/`. `.nojekyll` evita processamento desnecessário.
