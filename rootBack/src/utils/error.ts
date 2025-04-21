import { Request } from "express";
import { ValidationError, validationResult } from "express-validator";

interface ErrorMeta {
    status: number;
    errors?: ValidationError[];
    className: string;
    functionName: string;
    message: string;
}

export class StatusError extends Error {
    errorChain: ErrorMeta[];

    constructor(meta: ErrorMeta, previousError?: StatusError | Error | unknown) {
        super(meta.message);
        this.name = this.constructor.name;

        if (previousError instanceof StatusError) {
            // Якщо це наш кастомний StatusError — додаємо всю ланку
            this.errorChain = [...previousError.errorChain, meta];
        } else if (previousError instanceof Error) {
            // Якщо це звичайний Error — додаємо як останню причину
            const unknownError: ErrorMeta = {
                status: 500,
                className: 'Error',
                functionName: '?',
                message: previousError.message || 'Невідома помилка',
            };
            this.errorChain = [unknownError, meta];
        } else {
            // Якщо немає попередньої помилки
            this.errorChain = [meta];
        }

        // Красива трасування
        Error.captureStackTrace(this, this.constructor);
    }

    // Вирівнювання рядка до певної довжини
    private padString(str: string, length: number): string {
        return str.padEnd(length, ' ');
    }

    // Вивід помилки у вигляді "квадратиків"
    toString(): string {
        const maxLength = 50;
        const borderChar = '━';
        const border = borderChar.repeat(maxLength);

        const header = {
            class: 'Class:      ',
            function: 'Function:   ',
            status: 'Status:     ',
            message: 'Message:    ',
            errors: 'Errors:     ',
        };

        return this.errorChain.map((meta, index) => {
            const classLine = `${header.class}[${meta.className}]`;
            const functionLine = `${header.function}[${meta.functionName}]`;
            const statusLine = `${header.status}[${meta.status}]`;
            const messageLine = `${header.message}${meta.message}`;
            const errorsLine = `${header.errors}[${meta.errors?.length
                ? meta.errors.map(err => JSON.stringify(err))
                .join(',').replace(/,/g,',\n┃                 ')
                .replace(/{/g,'{\n┃               ')
                .replace(/}/g,'\n┃               }')
                : 'Немає'}]`;

            const lines = [
                classLine,
                functionLine,
                statusLine,
                messageLine,
                errorsLine,
            ].map(line => this.padString(line, maxLength));

            return `
${++index} ${border} ${index}
┃ ${lines[0]}
┃ ${lines[1]}
┃ ${lines[2]}
┃ ${lines[3]}
┃ ${lines[4]}
${index} ${border} ${index}
`;
        }).join('');
    }
}

// Інтерфейс для передачі параметрів
interface ThrowErrorOptions {
    status: number;
    className: string;
    functionName: string;
    message: string;
    errors?: ValidationError[];
    previousError?: StatusError | Error | unknown;
}

// Універсальна функція для генерації помилки
export function throwError({
    status,
    className,
    functionName,
    message,
    errors = [],
    previousError,
}: ThrowErrorOptions): never {
    throw new StatusError({ status, className, functionName, message, errors }, previousError);
}