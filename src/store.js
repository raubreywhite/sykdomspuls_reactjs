import {observable, transaction} from 'mobx';

export const store = observable({
    baseURL : "null",
    urlKommuneGetNamesKommune: "namesKommune?name=All",
    urlKommuneGetData: "v1_0_DataWeeklyOverviewKommune",
    urlWeeklyGetData: "v1_0_DataWeeklyLine",
    urlWeeklyGetNamesFylke: "namesFylke",
    urlWeeklyGetNamesKommune: "namesKommune",
    kommuneSelectedName : "municip0301",
    weekSelectedFylke : "Norge",
    weekSelectedName : "Norge",
    weekSelectedType: "respiratory",
    weekSelectedAge: "Totalt",
});
