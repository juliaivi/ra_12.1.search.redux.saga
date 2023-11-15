import { createStore, compose, combineReducers, applyMiddleware} from "redux"; //, configureStore applyMiddleware - добавление саги
import skillsReducer from "./reducers/skillsReducer";
import createSagaMiddleware from "redux-saga";
import saga from "./sagas";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //просто мидлвар с подключение REDUX_DEVTOOLS
const sagaMiddleware = createSagaMiddleware();
const reducer = combineReducers({ // объединяем все редьюсеры
    skills: skillsReducer,
});

const store = createStore (
    reducer, // корневой редьюсер
    composeEnhancers(applyMiddleware(sagaMiddleware)) // интегрирование саги внутырь проэкта
)

sagaMiddleware.run(saga);

export default store;