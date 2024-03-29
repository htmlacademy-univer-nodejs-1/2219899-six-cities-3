import {Command} from './command.interface';
import chalk from 'chalk';

export class CommandHelp implements Command {
  private readonly helpMessage: string =
    `
        Программа для подготовки данных для REST API сервера.
        Пример:
            ./main.cli.ts --<command> [--arguments]
        Команды:
            --version:                   # выводит номер версии
            --help:                      # печатает этот текст
            --import <path>:             # импортирует данные из TSV
            --generate <n> <path> <url>  # генерирует произвольное количество тестовых данных
    `;

  private readonly name: string = '--help';

  getName(): string {
    return this.name;
  }

  process(..._params: string[]): void {
    console.info(chalk.greenBright(this.helpMessage));
  }
}
