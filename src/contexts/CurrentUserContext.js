// import { createContext, useContext, useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import { axiosReq, axiosRes } from "../api/axiosDefaults";
// import { useHistory } from "react-router";

// export const CurrentUserContext = createContext();
// export const SetCurrentUserContext = createContext();

// export const useCurrentUser = () => useContext(CurrentUserContext);
// export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

// export const CurrentUserProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const history = useHistory();

//   const handleMount = async () => {
//     try {
//       const { data } = await axiosRes.get("dj-rest-auth/user/");
//       setCurrentUser(data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     handleMount();
//   }, []);

//   useMemo(() => {
//     axiosReq.interceptors.request.use(
//       async (config) => {
//         try {
//           await axios.post("/dj-rest-auth/token/refresh/");
//         } catch (err) {
//           setCurrentUser((prevCurrentUser) => {
//             if (prevCurrentUser) {
//               history.push("/signin");
//             }
//             return null;
//           });
//           return config;
//         }
//         return config;
//       },
//       (err) => {
//         return Promise.reject(err);
//       }
//     );

//     axiosRes.interceptors.response.use(
//       (response) => response,
//       async (err) => {
//         if (err.response?.status === 401) {
//           try {
//             await axios.post("/dj-rest-auth/token/refresh/");
//           } catch (err) {
//             setCurrentUser((prevCurrentUser) => {
//               if (prevCurrentUser) {
//                 history.push("/signin");
//               }
//               return null;
//             });
//           }
//           return axios(err.config);
//         }
//         return Promise.reject(err);
//       }
//     );
//   }, [history]);

//   return (
//     <CurrentUserContext.Provider value={currentUser}>
//       <SetCurrentUserContext.Provider value={setCurrentUser}>
//         {children}
//       </SetCurrentUserContext.Provider>
//     </CurrentUserContext.Provider>
//   );
// };


// import { createContext, useContext, useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import { axiosReq, axiosRes } from "../api/axiosDefaults";
// import { useHistory } from "react-router-dom";

// export const CurrentUserContext = createContext();
// export const SetCurrentUserContext = createContext();

// export const useCurrentUser = () => useContext(CurrentUserContext);
// export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

// export const CurrentUserProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const history = useHistory();

//   const handleMount = async () => {
//     try {
//       const { data } = await axiosRes.get("/dj-rest-auth/user/");
//       setCurrentUser(data);
//     } catch (err) {
//       console.log(err.response.data);
//     }
//   };

//   useEffect(() => {
//     handleMount();
//   }, []);

//   useMemo(() => {
//     axiosReq.interceptors.request.use(
//       async (config) => {
//         const accessToken = localStorage.getItem('accessToken');
//         if (accessToken) {
//           config.headers['Authorization'] = `Bearer ${accessToken}`;
//         }
//         return config;
//       },
//       (err) => Promise.reject(err)
//     );

//     axiosRes.interceptors.response.use(
//       (response) => response,
//       async (error) => {
//         const originalRequest = error.config;

//         if (error.response?.status === 401 && !originalRequest._retry) {
//           originalRequest._retry = true;
//           try {
//             const refreshToken = localStorage.getItem('refreshToken');
//             const { data } = await axios.post("/dj-rest-auth/jwt/refresh/", { refresh: refreshToken });
//             localStorage.setItem('accessToken', data.access);
//             axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
//             originalRequest.headers['Authorization'] = `Bearer ${data.access}`;
//             return axios(originalRequest);
//           } catch (err) {
//             setCurrentUser(null);
//             localStorage.removeItem('accessToken');
//             localStorage.removeItem('refreshToken');
//             history.push("/signin");
//             return Promise.reject(err);
//           }
//         }
//         return Promise.reject(error);
//       }
//     );
//   }, [history]);

//   return (
//     <CurrentUserContext.Provider value={currentUser}>
//       <SetCurrentUserContext.Provider value={setCurrentUser}>
//         {children}
//       </SetCurrentUserContext.Provider>
//     </CurrentUserContext.Provider>
//   );
// };




import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useHistory } from "react-router";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get("dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  useMemo(() => {
    axiosReq.interceptors.request.use(
      async (config) => {
        try {
          await axios.post("/dj-rest-auth/token/refresh/");
        } catch (err) {
          setCurrentUser((prevCurrentUser) => {
            if (prevCurrentUser) {
              history.push("/signin");
            }
            return null;
          });
          return config;
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push("/signin");
              }
              return null;
            });
          }
          return axios(err.config);
        }
        return Promise.reject(err);
      }
    );
  }, [history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};