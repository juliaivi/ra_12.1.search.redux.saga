import { searchSkills } from "../../api";
import { CHANGE_SEARCH_FIELD, SEARCH_SKILLS_REQUEST } from "../actions/actionType";
import { searchSkillsRequest, searchSkillsSuccess, reset, searchSkillsFailure } from "../actions/actionCreators";

//all - неплохо справляются с паралельными задачами при использованнии call, возвращает результат когда прийдут оба результатаб если один из запросов упадет, то он не вернет ничего
//race - неплохо справляются с паралельными задачами при использованнии call, возвращает результат той которая выполнилась быстрее 
// fork - он позволяет выполнить несколько саг паралельно не блокируя их
//takeEvery  - take+fork (многократное выполнение определенного действия т.е. срабатывает  каждый раз когда будет нажата кнопка)б дает независимость запросам
// takeLatest - takeEvery + отмена предыдущей задачи (осуществляет вызов только последней переданной функции )
// select - позволяет удобно работать со стором и получать нужные данные прямо в саге
//debounce - позволяет запустить сагу только после того как перестанут поступать экшены в течении определенного промежутка времени
// retry - для реализации нескольких попыток
// call - создает эффект который приводит к вызову функции. Является блокирующим эффектом и выполняет переданную в него функцию и если она возвращает промис, то данный эфект приостанавливает сагу до тех пор пока промис не вернет резолв
//put - это по сути аналог диспатчаб диспатчит переданный экшен
// spawn - создает паралельную задачу в корне саги и ее использование не привязоно к родителю. Является не блокирующей задачей
import { takeLatest, debounce, retry, put, spawn, call } from "redux-saga/effects";




//worKer
// при изменении в поисковой строке
function* handleChangeSearchSaga(action) {
  if( action.payload.search.trim() === '') {
    yield put(reset());
  } else {
    yield put(searchSkillsRequest(action.payload.search))
  }
}

function* handleSearchSkillsSaga(action) {
    try {
        const retryCount = 3;// три раза
        const retryDelay = 1 * 1000;// через 3 сек.
        
        const data = yield retry(retryCount, retryDelay, searchSkills, action.payload.search);
        yield put(searchSkillsSuccess(data));
    } catch (e) {
        yield put(searchSkillsFailure(e.message));
    }
}

function filterChangeSearchAction({type, payload}) {
    return type === CHANGE_SEARCH_FIELD;
}
//wotchers
function* watchChangeSearchSaga() { // отвечает за изменение в поисковой строке
    yield debounce(200, filterChangeSearchAction, handleChangeSearchSaga);
}

// запрос
function* watchSearchSkillSaga() { //запрос на сервер
    yield takeLatest(SEARCH_SKILLS_REQUEST, handleSearchSkillsSaga);
}
//корневая сага
export default function* saga() {
    yield spawn(watchChangeSearchSaga);
    yield spawn(watchSearchSkillSaga);
}