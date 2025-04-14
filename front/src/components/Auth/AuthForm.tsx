import React, { HTMLAttributes } from "react";
import { RegisterOptions, useForm } from "react-hook-form";
import { Path } from "react-hook-form";

type PoleType<T extends Record<string, string>> = {
    name: Path<T>;
    label: string;
    type: string;
    poleType: string;
    validation: RegisterOptions<T, Path<T>>;  // Указываем тип для validation
    select?: string[];
};

type AuthFormPropsType<T extends Record<string, string>> = HTMLAttributes<HTMLElement> & {
    title: string;
    submitButtonText: string;
    submitForm: (data: T) => void;  // Переименовали handleSubmit
    fields: PoleType<T>[];
};

export default function AuthForm<T extends Record<string, string>>({
    fields,
    title,
    submitButtonText,
    submitForm,  // Переименовали handleSubmit
    ...props
}: AuthFormPropsType<T>): React.ReactElement {

    const { register, handleSubmit, formState: { errors } } = useForm<T>();

    return (
        <form onSubmit={handleSubmit(submitForm)} className="container mt-4 p-4 shadow-sm rounded">
            <h4 className="mb-4">{title}</h4>
            {
                fields.map((item, index) => {
                    return (
                        <div key={index} className="mb-3">
                            <label htmlFor={item.name} className="form-label">{item.label}</label>
                            {
                                item.poleType === 'input' && (
                                    <input
                                        type={item.type}
                                        className={`form-control ${errors[item.name] ? 'is-invalid' : ''}`}
                                        {...register(item.name, item.validation)} // Передаем validation
                                    />
                                )
                            }
                            {
                                item.poleType === 'select' && item.select != undefined && (
                                    <select
                                        id={`select + ${item.name}`}
                                        className={`form-select ${errors[item.name] ? 'is-invalid' : ''}`}
                                        {...register(item.name, item.validation)}
                                    >
                                        {
                                            item.select.map((value, index) => {
                                                return (
                                                    <option key={index} value={value}>
                                                        {value}
                                                    </option>
                                                );
                                            })
                                        }
                                    </select>
                                )
                            }
                            {typeof errors[item.name]?.message === 'string' && (
                                <div className="invalid-feedback">{`${errors[item.name]?.message}`}</div>
                            )}
                        </div>
                    );
                })
            }
            <button type="submit" className="btn btn-primary w-100 mt-3">{submitButtonText}</button>
        </form>
    );
}
