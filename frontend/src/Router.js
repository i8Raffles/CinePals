import {createBrowserRouter, Navigate} from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import MovieList from "./movies/MovieList";
import MovieDetail from "./movies/MovieDetail";
import MyProfile from "./my/MyProfile";
import UserProfile from "./user/UserProfile";
import MyFollows from "./my/MyFollows";
import MyMovies from "./my/MyMovies";
import MyReviews from "./my/MyReviews";
import React from "react";
import MyContainer from "./my/MyContainer";
import UserContainer from "./user/UserContainer";
import UserMovies from "./user/UserMovies";
import UserReviews from "./user/UserReviews";
import UserFollows from "./user/UserFollows";

const router = createBrowserRouter([
    {
        element: <RootLayout/>,
        children: [
            {
                path: '/movies',
                element: <MovieList/>
            },
            {
                path: '/movies/:movieId',
                element: <MovieDetail/>
            },
            {
                element: <MyContainer/>,
                children: [
                    {
                        path: '/my/follows',
                        element: <MyFollows/>
                    },
                    {
                        path: '/my/movies',
                        element: <MyMovies/>
                    },
                    {
                        path: '/my/profile',
                        element: <MyProfile/>
                    },
                    {
                        path: '/my/reviews',
                        element: <MyReviews/>
                    }
                ]
            },
            {
                element: <UserContainer/>,
                children: [
                    {
                        path: 'user/:userId/profile',
                        element: <UserProfile/>
                    },
                    {
                        path: 'user/:userId/movies',
                        element: <UserMovies/>
                    },
                    {
                        path: 'user/:userId/reviews',
                        element: <UserReviews/>
                    },
                    {
                        path: 'user/:userId/follows',
                        element: <UserFollows/>
                    },
                ]
            },
        ]
    },
    {
        path: '/',
        element: <Navigate to="/movies"/>
    }
]);

export default router;
