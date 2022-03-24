using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ContextualizeDemo.Core.Helpers
{
    public static class Constants
    {
        public const string AppName = "Contextualize";

        public static class Role
        {
            public static int TRANSLATOR = 1;
            public static int REVIEWER = 2;
            public static int CONTEXTUALIZER = 3;

            public static Dictionary<int, string> VALUES = new Dictionary<int, string>()
            {
                { TRANSLATOR, "Translator" },
                { REVIEWER, "Reviewer" },
                { CONTEXTUALIZER, "Contextualizer" },
            };
        }

        public static class Message
        {
            public static class Error
            {
                public const string MESSAGE = "Ocurrió un problema al procesar su consulta";
                public const string TITLE = "Error";
            }

            public static class Info
            {
                public const string MESSAGE = "Mensaje informativo";
                public const string TITLE = "Info";
            }

            public static class Success
            {
                public const string MESSAGE = "Tarea realizada satisfactoriamente";
                public const string TITLE = "Éxito";
            }

            public static class Validation
            {
                public const string COMPARE = "Field '{PropertyName}' does not match '{ComparisonValue}'.";
                public const string COMPARE_PASSWORD = "Passwords do not match.";
                public const string EMAIL_ADDRESS = "Field '{PropertyName}' is not a valid email.";
                public const string CREDIT_CARD = "El campo '{PropertyName}' no es un número de tarjeta válido.";
                public const string EQUAL = "Field '{PropertyName}' must be equal to {ComparisonValue}.";
                public const string NOT_EQUAL = "El campo '{PropertyName}' debe tener un valor diferente a {ComparisonValue}.";
                public const string GREATER_THAN = "El campo '{PropertyName}' debe tener un valor mayor a {ComparisonValue}.";
                public const string GREATER_THAN_OR_EQUAL = "El campo '{PropertyName}' debe tener un valor mayor o igual a {ComparisonValue}.";
                public const string LESS_THAN = "Field '{PropertyName}' must be less than {ComparisonValue}.";
                public const string LESS_THAN_OR_EQUAL = "El campo '{PropertyName}' debe tener un valor menor o igual a {ComparisonValue}.";
                public const string MAX_LENGTH = "El campo '{PropertyName}' debe tener {ComparisonValue} caracteres como máximo. Ingresaste {TotalLength} caracteres.";
                public const string MIN_LENGTH = "El campo '{PropertyName}' debe tener {ComparisonValue} caracteres como mínimo. Ingresaste {TotalLength} caracteres.";
                public const string LENGTH = "El campo '{PropertyName}' debe tener {MinLength} caracteres. Ingresaste {TotalLength} caracteres.";
                public const string LENGTH_RANGE = "El campo '{PropertyName}' debe tener {MinLength}-{MaxLength} caracteres. Ingresaste {TotalLength} caracteres.";
                public const string INCLUSIVE_BETWEEN = "Field '{PropertyName}' must be between {From}-{To}. You put {Value}.";
                public const string EXCLUSIVE_BETWEEN = "El campo '{PropertyName}' debe tener un valor entre {From}-{To} (exclusivo). Ingresaste {Value}.";
                public const string REGULAR_EXPRESSION = "El campo '{PropertyName}' no es válido.";
                public const string SCALED_PRECISION = "El campo '{PropertyName}' no debe tener más de {ExpectedPrecision} dígitos ni más de {ExpectedScale} decimales. Ingresaste {Digits} dígitos con {ActualScale} decimales.";
                public const string REQUIRED = "Field '{PropertyName}' is required.";
                public const string NOT_VALID = "El campo '{PropertyName}' no es válido.";
                public const string FILE_EXTENSIONS = "El campo '{PropertyName}' solo acepta archivos con los formatos: {1}.";
            }
        }
    }
}
