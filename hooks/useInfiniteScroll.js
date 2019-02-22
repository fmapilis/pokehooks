import { useState, useRef, useEffect } from "react";
import httpClient from "../api/httpClient";

export default (listEndpoint, listKey, limit = 15) => {
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [initialized, setInitialized] = useState(false);

  const listRef = useRef(null);

  const loadMoreItems = async() => {
    setLoading(true);
  
    const { data } = await httpClient.get(listEndpoint, {
      params: {
        limit,
        offset: list.length
      }
    });

    setList(list.concat(data[ listKey ]));
    setTotal(data.total);
    setLoading(false);
  }

  const onScroll = async ({ target }) => {
    if (
      !loading &&
      list.length !== total &&
      target.scrollTop + target.offsetHeight + 40 >= target.scrollHeight
    ) {
      loadMoreItems();
    }
  }

  useEffect(() => {
    const listElement = listRef.current;
    listElement.addEventListener("scroll", onScroll);

    if (!initialized) {
      loadMoreItems();
      setInitialized(true);
    }

    return () => {
      listElement.removeEventListener("scroll", onScroll);
    };
  });

  return [
    list,
    listRef,
    total
  ];
}