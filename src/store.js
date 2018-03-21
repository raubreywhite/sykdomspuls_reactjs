import {observable} from 'mobx';

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
    weekSelectedType: "gastro",
    weekSelectedAge: "Totalt",
    namesType: [{'value':'gastro','name':'xx'}],
    namesAge: [
        {'value':'Totalt','name':'Totalt'},
        {'value':'0-4','name':'0-4'},
        {'value':'5-14','name':'5-14'},
        {'value':'15-19','name':'15-19'},
        {'value':'20-29','name':'20-29'},
        {'value':'30-64','name':'30-64'},
        {'value':'65+','name':'65+'}
      ],
    namesFylke: [],
});
