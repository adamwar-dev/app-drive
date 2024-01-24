FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

ENV DOTNET_URLS = http://+:4000

WORKDIR /app

COPY *.csproj ./
RUN dotnet restore

COPY . ./
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build /app/out .

# Define the entry point
ENTRYPOINT ["dotnet", "AppDrive.API.dll"]