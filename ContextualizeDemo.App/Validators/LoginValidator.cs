using ContextualizeDemo.App.ViewModels;
using ContextualizeDemo.Core.Helpers;
using FluentValidation;

namespace ContextualizeDemo.App.Validators
{
    public class LoginValidator : AbstractValidator<LoginViewModel>
    {
        public LoginValidator()
        {
            RuleFor(login => login.Email)
                .NotEmpty()
                    .WithMessage(Constants.Message.Validation.REQUIRED)
                .EmailAddress()
                    .WithMessage(Constants.Message.Validation.EMAIL_ADDRESS);
            RuleFor(login => login.Password)
                .NotEmpty()
                    .WithMessage(Constants.Message.Validation.REQUIRED);
        }
    }
}
