using ContextualizeDemo.App.ViewModels;
using ContextualizeDemo.Core.Helpers;
using FluentValidation;

namespace ContextualizeDemo.App.Validators
{
    public class RoleSelectorValidator : AbstractValidator<RoleSelectorViewModel>
    {
        public RoleSelectorValidator()
        {
            RuleFor(role => role.Role)
                .InclusiveBetween(Constants.Role.VALUES.Keys.Min(), Constants.Role.VALUES.Keys.Max())
                    .WithMessage("Please, select a Role to continue.");
        }
    }
}
