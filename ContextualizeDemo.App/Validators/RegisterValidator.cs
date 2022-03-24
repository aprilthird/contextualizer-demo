using ContextualizeDemo.App.ViewModels;
using ContextualizeDemo.Core.Helpers;
using FluentValidation;

namespace ContextualizeDemo.App.Validators
{
    public class RegisterValidator : AbstractValidator<RegisterViewModel>
    {
        public RegisterValidator()
        {
            RuleFor(register => register.FirstName)
                .NotEmpty()
                    .WithMessage(Constants.Message.Validation.REQUIRED);
            RuleFor(register => register.LastName)
                .NotEmpty()
                    .WithMessage(Constants.Message.Validation.REQUIRED);
            RuleFor(register => register.BirthDate)
                .NotEmpty()
                    .WithMessage(Constants.Message.Validation.REQUIRED)
                .LessThan(DateTime.Now)
                    .WithMessage(Constants.Message.Validation.LESS_THAN);
            RuleFor(register => register.Email)
                .NotEmpty()
                    .WithMessage(Constants.Message.Validation.REQUIRED)
                .EmailAddress()
                    .WithMessage(Constants.Message.Validation.EMAIL_ADDRESS);
            RuleFor(register => register.Password)
                .NotEmpty()
                    .WithMessage(Constants.Message.Validation.REQUIRED);
            RuleFor(register => register.ConfirmPassword)
                .Equal(register => register.Password)
                    .WithMessage(Constants.Message.Validation.COMPARE_PASSWORD);
        }
    }
}
