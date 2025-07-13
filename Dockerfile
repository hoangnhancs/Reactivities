

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /source

COPY ./*.sln .
COPY ./API/*.csproj ./API/
COPY ./Application/*.csproj ./Application/
COPY ./Domain/*.csproj ./Domain/
COPY ./Infrastructure/*.csproj ./Infrastructure/
COPY ./Persistence/*.csproj ./Persistence/
RUN dotnet restore "./API/API.csproj"

COPY . .


FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

# Entrypoint để chạy ứng dụng
ENTRYPOINT ["dotnet", "API.dll"]