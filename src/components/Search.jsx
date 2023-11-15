import {useSelector, useDispatch} from 'react-redux';
import { changeSearchField } from '../redux/actions/actionCreators';

export default function Search() {
    const {items, loading, error, search} = useSelector((state) => state.skills);
    console.log(useSelector((state) => state), 'Search- useSelector((state) => state')
    const dispatch = useDispatch();

    const handleSearch = (e) => {
        const {value} = e.target;
        dispatch(changeSearchField(value));
    }

    const hasQuery = search.trim() !== ""; // есть запрос

    return (
        <>
            <div>
                <input type="search" value={search} onChange={handleSearch} />
            </div>
            {!hasQuery && <div>Type something to search</div>} 
            {hasQuery && loading && <div>searching...</div>}
            {error && <div>{error}</div>}
            {items !== undefined && <ul>{items.map((el) => <li key={el.id}>{el.name}</li>)} </ul>}

        </>
    )
}