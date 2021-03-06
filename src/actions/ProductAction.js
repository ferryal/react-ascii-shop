import { BaseUrl } from '../constants/Api';

export function fetchProducts(page = 0, sort = 'id') {
  return async (dispatch) => {
    dispatch({
      type: 'FETCH',
    });
    fetch(`${BaseUrl}api/products?limit=10&skip=${page}&sort=${sort}`)
      .then((result) => {
        if (result.status === 200) {
          return result.text();
        }
      })
      .then((json) => {
        const data = JSON.parse(json.toString());
        dispatch({
          type: 'FETCH_SUCCESS',
          payload: data,
          sort,
        });
      })
      .catch((error) => {
        dispatch({
          type: 'FETCH_ERROR',
          payload: error,
        });
      });
  };
}
