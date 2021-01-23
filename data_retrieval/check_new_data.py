import json
from datetime import datetime, timedelta
import sys
import requests

r = requests.get(
    "https://coronavirus.data.gov.uk/api/v1/data?filters=areaType=overview&structure=%7B%22areaType%22:%22areaType%22,%22areaName%22:%22areaName%22,%22areaCode%22:%22areaCode%22,%22date%22:%22date%22,%22newPeopleVaccinatedFirstDoseByPublishDate%22:%22newPeopleVaccinatedFirstDoseByPublishDate%22,%22newPeopleVaccinatedSecondDoseByPublishDate%22:%22newPeopleVaccinatedSecondDoseByPublishDate%22,%22cumPeopleVaccinatedFirstDoseByPublishDate%22:%22cumPeopleVaccinatedFirstDoseByPublishDate%22,%22cumPeopleVaccinatedSecondDoseByPublishDate%22:%22cumPeopleVaccinatedSecondDoseByPublishDate%22%7D&format=json"
)

response_data = json.loads(r.content)

all_dates = [datetime.strptime(x["date"], "%Y-%m-%d") for x in response_data["data"]]
all_dates.sort(reverse=True)

if all_dates[0].date() == ((datetime.today() - timedelta(days=1))).date():

    with open("../src/data/data-vaccination.json", "w") as file:

        json.dump(response_data["data"], file)
        sys.exit(0)

else:
    sys.exit(1)