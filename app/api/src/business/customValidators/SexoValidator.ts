import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

enum Sexo {
  Masculino = "M",
  Feminino = "F",
  Outro = "O",
}

export function sexoValidator(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: SexoValidator,
    });
  };
}

@ValidatorConstraint({ name: "SexoValido" })
export class SexoValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    return Object.values(Sexo).includes(value as Sexo);
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return "Sexo deve ser 'M', 'F' ou 'O'";
  }
}
