# Stage 1: Build frontend
FROM node:23-slim AS frontend-build
WORKDIR /app
COPY client/ ./
RUN npm install && npm run build

# Stage 2: Build backend
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY . .
RUN dotnet restore ./API/API.csproj
RUN dotnet build ./API/API.csproj -c Release -o /app/build
RUN dotnet publish ./API/API.csproj -c Release -o /app/publish

# Stage 3: Final runtime image
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

# Copy built frontend to wwwroot
COPY --from=frontend-build /app/dist ./wwwroot
# Thêm dòng này nếu .db nằm ở API/
COPY API/reactivities.db ./
ENTRYPOINT ["dotnet", "API.dll"]
