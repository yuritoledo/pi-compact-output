/**
 * pi-compact-output
 *
 * Mostra 1 linha por default no output de ferramentas.
 * Ctrl+O (expand) mostra o conteúdo completo.
 *
 * Overrideia: bash, read, grep, find, ls, edit, write
 * Herda execução original, só troca renderização TUI.
 *
 * Instalação: pi install git:github.com/yuritoledo/pi-compact-output
 */

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { Text } from "@earendil-works/pi-tui";
import {
  createReadToolDefinition,
  createBashToolDefinition,
  createEditToolDefinition,
  createWriteToolDefinition,
  createGrepToolDefinition,
  createFindToolDefinition,
  createLsToolDefinition,
} from "@earendil-works/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  const cwd = process.cwd();
  const builtIn = {
    read: createReadToolDefinition(cwd),
    bash: createBashToolDefinition(cwd),
    edit: createEditToolDefinition(cwd),
    write: createWriteToolDefinition(cwd),
    grep: createGrepToolDefinition(cwd),
    find: createFindToolDefinition(cwd),
    ls: createLsToolDefinition(cwd),
  };

  for (const [_name, def] of Object.entries(builtIn)) {
    pi.registerTool({
      ...def,
      renderResult(result, options, theme, context) {
        // Expandido = conteúdo completo (herda rendering original)
        if (options.expanded) {
          return def.renderResult?.(result, options, theme, context)
            ?? new Text("", 0, 0);
        }

        // Erro mostra vermelho
        if (result.isError) {
          const text = result.content?.[0]?.text ?? "Error";
          return new Text(theme.fg("error", text), 0, 0);
        }

        const raw = result.content?.[0]?.text ?? "";
        const lines = raw.split("\n");
        const first = lines[0] ?? "";

        // 1 linha ou menos = mostra direto
        if (lines.length <= 1) {
          return new Text(first, 0, 0);
        }

        // 1 linha + contador de linhas adicionais
        const rest = lines.length - 1;
        const suffix = rest === 1 ? "linha" : "linhas";
        const label = `${first}${theme.fg("dim", ` … +${rest} ${suffix}`)}`;
        return new Text(label, 0, 0);
      },
    });
  }
}
