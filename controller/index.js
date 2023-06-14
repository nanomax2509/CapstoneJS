
export const getAllProductApi = async (dispatch) => {
    try {
      const fetch = await http.get("https://shop.cyberlearn.vn/api/Product");
      dispatch(updateProductReducer(fetch.data.content));
      dispatch(updateProductRandomCarousel(suffleArray(fetch.data.content, 5)));
    } catch (error) {
      console.log(error);
    }
  };
