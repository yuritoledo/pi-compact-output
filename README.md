# pi-compact-output

Extensão para [pi](https://pi.dev/) que mostra **1 linha por default** no output de ferramentas (`bash`, `read`, `grep`, `find`, `ls`, `edit`, `write`).

Pressione **Ctrl+O** para expandir e ver o conteúdo completo.

## Instalação

```bash
pi install git:github.com/yuritoledo/pi-compact-output
```

Ou adicione nos `packages` do `~/.pi/agent/settings.json`:

```json
{
  "packages": ["git:github.com/yuritoledo/pi-compact-output"]
}
```

## Comportamento

| Estado | Mostra |
|--------|--------|
| Colapsado (default) | 1ª linha + `"… +N linhas"` |
| Expandido (Ctrl+O) | Conteúdo completo com syntax highlight |
| Erro | Mensagem em vermelho |
| 1 linha só | A linha direto, sem contador |

## Como funciona

Overrideia as ferramentas built-in do pi usando `create*ToolDefinition()`.
Herda a execução original — só substitui a renderização TUI.

## Desenvolvimento

```bash
git clone git@github.com:yuritoledo/pi-compact-output.git
cd pi-compact-output
# Testar localmente
pi -e ./src/index.ts
```

## Licença

MIT
