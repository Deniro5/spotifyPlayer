import { useState, useEffect } from "react";
import axios from "axios";
import { useAppDispatch } from "../hooks";
import { setCurrentUser } from "../redux/slices/playerSlice";
import { User } from "../types";

export default function useAuth(code: string) {
  const dispatch = useAppDispatch();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:3001/login", {
        code,
      })
      .then((res) => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        window.history.pushState({}, "", "/");
      })
      .catch(() => {
        window.location.href = "/";
      });
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post("http://localhost:3001/refresh", {
          refreshToken,
        })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
        })
        .catch(() => {
          window.location.href = "/";
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  useEffect(() => {
    if (!accessToken) return;
    fetch(`https://api.spotify.com/v1/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data: User) => {
        const { display_name, images, email, uri, id } = data;
        dispatch(
          setCurrentUser({
            display_name,
            images,
            email,
            uri,
            id,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [accessToken]);

  return accessToken;
}
