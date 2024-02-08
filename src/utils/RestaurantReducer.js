import axios from "axios";

export default async function restaurantReducer(state, action) {
  switch (action.type) {
    case "FETCH_ONE": {
      let res = { data: state.data };
      await axios
        .get(
          `https://65c3642539055e7482c0c4ba.mockapi.io/api/v1/Restaurant/${action.payload.id}/gallery`
        )
        .then((response) => {
          res = { ...res, gallery: response.data };
        })
        .catch((err) => console.error(err));
      await axios
        .get(
          `https://65c3642539055e7482c0c4ba.mockapi.io/api/v1/Restaurant/${action.payload.id}/Menu`
        )
        .then((response) => {
          res = { ...res, menu: response.data };
        })
        .catch((err) => console.error(err));
      return res;
    }

    default:
      throw new Error(`No action matched with name ${action}`);
  }
}
