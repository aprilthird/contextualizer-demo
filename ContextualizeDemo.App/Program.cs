using Blazored.LocalStorage;
using Blazored.Modal;
using Blazored.SessionStorage;
using Blazored.Toast;
using ContextualizeDemo.App;
using ContextualizeDemo.App.ViewModels;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

//add Blazored package
builder.Services.AddBlazoredLocalStorage();
builder.Services.AddBlazoredSessionStorage();
builder.Services.AddBlazoredModal();
builder.Services.AddBlazoredToast();

//add ViewModels
builder.Services.AddTransient<LoginViewModel>();
builder.Services.AddTransient<RegisterViewModel>();
builder.Services.AddTransient<RoleSelectorViewModel>();
builder.Services.AddTransient<ScenarioSelectorViewModel>();

await builder.Build().RunAsync();
