import { useAppSelector, useAppDispatch } from "../hooks";
import { addSongsStatusHash } from "../redux/slices/playerSlice";
import { getAccessToken } from "../redux/slices/selectors";

const useFetchLikedStatus = () => {
  const accessToken = useAppSelector(getAccessToken);
  const dispatch = useAppDispatch();

  const getLikedStatus = (uris: string[]) => {
    if (!accessToken) return;

    const fetchUrl = `https://api.spotify.com/v1/me/tracks/contains?ids=${uris.join(
      ","
    )}`;

    fetch(fetchUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const likedStatuses = data.reduce(
          (acc: Record<string, boolean>, cur: boolean, index: number) => {
            acc[uris[index]] = cur;
            return acc;
          },
          {}
        );
        dispatch(addSongsStatusHash(likedStatuses));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    getLikedStatus,
  };
};

export default useFetchLikedStatus;
