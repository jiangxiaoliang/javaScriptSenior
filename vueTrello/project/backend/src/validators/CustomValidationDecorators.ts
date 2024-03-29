import { ValidationOptions, registerDecorator, ValidationArguments } from "class-validator";


export function IsSameValue(property: string, validationOptions?: ValidationOptions) {
    return function(
        target: Object,
        propertyName: string
    ) {
        registerDecorator({
            name: 'isSameValue',
            target: target.constructor,
            propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
                    const relatedValue = validationArguments && (validationArguments.object as any)[property]
                    return relatedValue === value
                }
            }
        })
    }
}