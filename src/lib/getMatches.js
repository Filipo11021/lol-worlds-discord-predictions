import fetch from "node-fetch";

const LIMIT = 1000 * 60 * 60 * 9;
const END_LIMIT = 1000 * 60 * 60 * (24 + 9);

async function fetchMatches() {
  const matchesApi = {
    url: "https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=en-GB&leagueId=98767975604431411",
    "x-api-key": "0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z",
  };

  const res = await fetch(matchesApi.url, {
    headers: {
      "x-api-key": matchesApi["x-api-key"],
    },
  });
  const data = await res.json();
  const events = data.data.schedule.events;

  return events;
}

async function getCurrentMatches(end_limit = END_LIMIT) {
  const events = await fetchMatches();
  const unstartedEvents = events.filter((e) => e.state === "unstarted");

  const currentDate = new Date().getTime();
  const matchStartDate = new Date(unstartedEvents[0].startTime).getTime();

  const limit = LIMIT;
  const min_limit = currentDate + limit;
  const max_limit = end_limit + matchStartDate;

  const currentEvents = unstartedEvents.filter((e) => {
    const date = new Date(e.startTime).getTime();
    if (date > min_limit && date < max_limit) return true;
  });

  return currentEvents;
}

export async function getFormatedMatches(end_limit = END_LIMIT) {
  const currentEvents = await getCurrentMatches(end_limit);
  const result = currentEvents.map((e) => ({
    teams: e.match.teams,
    startTime: e.startTime,
  }));

  return result;
}
