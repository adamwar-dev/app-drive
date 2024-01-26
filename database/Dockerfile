# Use the official SQL Server image
FROM mcr.microsoft.com/mssql/server:2019-latest

# Set the environment variables
ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=YourStrong!Passw0rd
ENV MSSQL_TCP_PORT=1433
ENV MSSQL_PID=Express

# Create a new database
ENV MSSQL_DBNAME=TAI_DB

# Expose the SQL Server port
EXPOSE 1433

# Run SQL Server on container start
CMD /opt/mssql/bin/sqlservr