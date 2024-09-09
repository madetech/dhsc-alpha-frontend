import azure.functions as func
import logging
from azure.identity import ManagedIdentityCredential, DefaultAzureCredential
import pyodbc
import struct
import pandas as pd
import os
from dotenv import load_dotenv

load_dotenv()

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

connection_string = "Driver={ODBC Driver 18 for SQL Server};Server=tcp:dapalpha-sql-data-" + os.getenv(
    "ENVIRONMENT") + ".database.windows.net,1433;Database=Analytical_Datastore;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30"

credential = DefaultAzureCredential() if os.environ["ENV"] == "local" else ManagedIdentityCredential(
    client_id=os.getenv("MANAGED_IDENTITY_CLIENT_ID"))

token_bytes = credential.get_token(
    "https://database.windows.net/.default").token.encode("UTF-16-LE")

token_struct = struct.pack(
    f'<I{len(token_bytes)}s', len(token_bytes), token_bytes)
SQL_COPT_SS_ACCESS_TOKEN = 1256

conn = pyodbc.connect(connection_string, attrs_before={
    SQL_COPT_SS_ACCESS_TOKEN: token_struct})


@app.route(route="get_ascof_data")
def get_ascof_data(req: func.HttpRequest) -> func.HttpResponse:
    df = pd.read_sql("select geographical_description, measure_group_description, outcome FROM ASCOF.all_metrics WHERE geographical_level='Region' AND disaggregation_level = 'Total' AND fiscal_year='2023'", conn)
    return func.HttpResponse(
        df.to_json(orient="records"),
        status_code=200
    )
