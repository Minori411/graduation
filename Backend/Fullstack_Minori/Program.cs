using Fullstack_Minori.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web;


using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Swagger�̐ݒ��ǉ�
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });

    // OAuth2 �Z�L�����e�B�X�L�[���̐ݒ�
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Type = SecuritySchemeType.OAuth2,
        Flows = new OpenApiOAuthFlows
        {
            AuthorizationCode = new OpenApiOAuthFlow
            {
                AuthorizationUrl = new Uri("https://login.microsoftonline.com/34e13d85-3d97-43dd-9521-81f6ed0fdb5d/oauth2/authorize"),
                TokenUrl = new Uri("https://login.microsoftonline.com/34e13d85-3d97-43dd-9521-81f6ed0fdb5d/oauth2/token"),
                Scopes = new Dictionary<string, string>
                {
                    { "read", "Read access" },
                    { "write", "Write access" }
                }
            }
        }
    });

    // �O���[�o���ɃZ�L�����e�B�v����ݒ�
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "oauth2"
                }
            },
            new[] { "read", "write" }
        }
    });
});


//var APP_SETTINGS = Path.Combine(AppContext.BaseDirectory, "appsettings.json");
//builder.AddJsonFile(APP_SETTINGS, optional: false);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
  .AddMicrosoftIdentityWebApi(builder.Configuration);


// Add services to the container.
builder.Services.AddControllers();



builder.Services.AddCors(options => options.AddPolicy("CorsPolicy", policy =>
{
    policy.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("https://localhost:44449");
}));


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDbContext<MyDbContext>(
    options => options.UseSqlServer(builder.Configuration.GetConnectionString("Default"))
);

var app = builder.Build();

// Swagger���g�p���邽�߂̃~�h���E�F�A��ݒ�
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
        options.OAuthClientId("7c78d20e-ddc7-4a38-bbc2-2db066510c73"); // OAuth�N���C�A���gID��ݒ�
        options.OAuthAppName("graduation_Minori");
        // �A�v���P�[�V��������ݒ�
        // �K�v�ɉ����đ���OAuth�ݒ�������ɒǉ�
    });
}


app.MapControllers();
app.UseCors("CorsPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.Run();