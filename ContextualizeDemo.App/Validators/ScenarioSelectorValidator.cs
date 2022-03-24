using ContextualizeDemo.App.ViewModels;
using ContextualizeDemo.Core.Helpers;
using FluentValidation;

namespace ContextualizeDemo.App.Validators
{
    public class ScenarioSelectorValidator : AbstractValidator<ScenarioSelectorViewModel>
    {
        public ScenarioSelectorValidator()
        {
            RuleFor(scenario => scenario.Location)
                .NotEmpty()
                    .WithMessage("Please, select a location to continue.");
        }
    }
}
