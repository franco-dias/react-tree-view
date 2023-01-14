## Fluxo de chatbot

### Problema

- Criar uma ViewTree recursiva para N níveis de profundidade
- Implementar ações:
  - Visualizar (apenas no último nível)
  - Editar
  - Excluir

### Libs

- Material UI
  - ViewTree
  - TreeItem
  - TreeView

### Proposta

- Criar função de Util para montar os componentes
- Guardar o path de cada item para operações
- Usar lodash para get e set operations via path