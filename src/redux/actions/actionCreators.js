import {
    CHANGE_SEARCH_FIELD,
    SEARCH_SKILLS_SUCCESS,
    SEARCH_SKILLS_REQUEST,
    SEARCH_SKILLS_FAILURE,
    RESET
} from './actionType';

export function changeSearchField(search) { // изменение
    return {
        type: CHANGE_SEARCH_FIELD,
        payload: {search},
    }
}

export function searchSkillsRequest(search) { // поиск
    return {
        type: SEARCH_SKILLS_REQUEST,
        payload: {search},
    }
}

export function searchSkillsSuccess(items) { // удачно
    return {
        type: SEARCH_SKILLS_SUCCESS,
        payload: {items},
    }
}

export function searchSkillsFailure(error) { // ошибка
    return {
        type: SEARCH_SKILLS_FAILURE,
        payload: {error},
    }
}

export function reset() { // сброс
    return {
        type: RESET,
    }
}