const reducer = (state.averages = {}, action) => {
  switch (action.type) {
    case "new_query":
      // extract the payload into shorthand variables
      queryName = action.payload["query"];
      info = action.payload["info"];
      // if the queryname isnt already saved to state,
      // initialize it with the payload info.
      if (!state.rawData[queryName]) state.rawData[queryName] = info;
       // otherwise add to the preexisting entry with the info.
      else state.rawData[queryName] += info;
      // return the now-modified state
      return state;
    default:
      // return the untouched state
      return state
  }
};

