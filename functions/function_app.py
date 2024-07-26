import azure.functions as func
import logging
from azure.identity import ManagedIdentityCredential, DefaultAzureCredential
import pyodbc, struct
import pandas as pd
import os
from dotenv import load_dotenv

load_dotenv()

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

connection_string="Driver={ODBC Driver 18 for SQL Server};Server=tcp:dapalpha-sql-data-dev.database.windows.net,1433;Database=Analytical_Datastore;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30"
credential = ManagedIdentityCredential(client_id="40824fec-9e29-4864-b055-a5ce3a7115fe")
# credential=DefaultAzureCredential()
token_bytes = credential.get_token("https://database.windows.net/.default").token.encode("UTF-16-LE")
token_struct = struct.pack(f'<I{len(token_bytes)}s', len(token_bytes), token_bytes)
SQL_COPT_SS_ACCESS_TOKEN = 1256  # This connection option is defined by microsoft in msodbcsql.h
conn = pyodbc.connect(connection_string, attrs_before={SQL_COPT_SS_ACCESS_TOKEN: token_struct})

#if os.environ["ENV"] == "local":
#    connection_string="Driver={ODBC Driver 18 for SQL Server};Server=tcp:dapalpha-sql-data-dev.database.windows.net,1433;Database=Analytical_Datastore;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30"
#    credential=DefaultAzureCredential()
#    token_bytes = credential.get_token("https://database.windows.net/.default").token.encode("UTF-16-LE")
#    token_struct = struct.pack(f'<I{len(token_bytes)}s', len(token_bytes), token_bytes)
#    SQL_COPT_SS_ACCESS_TOKEN = 1256  # This connection option is defined by microsoft in msodbcsql.h
#    conn = pyodbc.connect(connection_string, attrs_before={SQL_COPT_SS_ACCESS_TOKEN: token_struct})
#else:
#    connection_string="Driver={ODBC Driver 18 for SQL Server};Server=tcp:dapalpha-sql-data-dev.database.windows.net,1433;Database=Analytical_Datastore;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30"
#    credential = ManagedIdentityCredential(client_id="40824fec-9e29-4864-b055-a5ce3a7115fe")
#    token_bytes = credential.get_token("https://database.windows.net/.default").token.encode("UTF-16-LE")
#    token_struct = struct.pack(f'<I{len(token_bytes)}s', len(token_bytes), token_bytes)
#    SQL_COPT_SS_ACCESS_TOKEN = 1256  # This connection option is defined by microsoft in msodbcsql.h
#    conn = pyodbc.connect(connection_string, attrs_before={SQL_COPT_SS_ACCESS_TOKEN: token_struct})


@app.route(route="sql_test")
def sql_test(req: func.HttpRequest) -> func.HttpResponse:
    # df = pd.read_sql("SELECT TOP 100 * FROM ASCOF.all_metrics", conn)
    # df = pd.read_sql("select * from ASCOF.all_metrics WHERE geographical_level='Region' AND fiscal_year='2023'", conn)
    df = pd.read_sql("select geographical_description, measure_group_description, outcome FROM ASCOF.all_metrics WHERE geographical_level='Region' AND fiscal_year='2023'", conn)
    
    return func.HttpResponse(
        df.to_json(orient="records"),
        status_code=200
    )
