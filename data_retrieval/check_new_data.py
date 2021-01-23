import json
from datetime import datetime, timedelta
import sys
import requests

r = requests.get(
    "https://coronavirus.data.gov.uk/api/v1/data?filters=areaType=overview&structure=%7B%22areaType%22:%22areaType%22,%22areaName%22:%22areaName%22,%22areaCode%22:%22areaCode%22,%22date%22:%22date%22,%22newPeopleVaccinatedFirstDoseByPublishDate%22:%22newPeopleVaccinatedFirstDoseByPublishDate%22,%22newPeopleVaccinatedSecondDoseByPublishDate%22:%22newPeopleVaccinatedSecondDoseByPublishDate%22,%22cumPeopleVaccinatedFirstDoseByPublishDate%22:%22cumPeopleVaccinatedFirstDoseByPublishDate%22,%22cumPeopleVaccinatedSecondDoseByPublishDate%22:%22cumPeopleVaccinatedSecondDoseByPublishDate%22%7D&format=json"
)

response_data = json.loads(r.content)

all_dates_api = [
    datetime.strptime(x["date"], "%Y-%m-%d") for x in response_data["data"]
]
all_dates_api.sort(reverse=True)

with open("./src/data/vaccination-data.json", "r") as file:
    existing_data = json.load(file)

all_dates_existing = [
    datetime.strptime(x["date"], "%Y-%m-%d") for x in existing_data["data"]
]
all_dates_existing.sort(reverse=True)

if all_dates_api[0].date() > all_dates_existing[0].date():

    with open("./src/data/vaccination-data.json", "w") as file:

        json.dump(response_data, file)

    print(f"::set-output name=check_outcome::true", flush=True)

else:
    print(f"::set-output name=check_outcome::false", flush=True)