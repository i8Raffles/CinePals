import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
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
import UserLogin from "./auth/UserLogin";
import UserRegistration from "./auth/UserRegistration";
import SearchResults from "./movies/SearchResults";

const AppRouter = (props) => <BrowserRouter>
        <Routes>
            <Route element={<RootLayout {...props} />}>
                <Route element={<MovieList />} path="/movies" />
                <Route element={<MovieDetail />} path="/movies/:movieId" />
                <Route element={<SearchResults />} path="/movies/search/:searchText" />
                <Route element={<MyContainer />}>
                    <Route element={<MyFollows />} path="/my/follows" />
                    <Route element={<MyMovies />} path="/my/movies" />
                    <Route element={<MyProfile />} path="/my/profile" />
                    <Route element={<MyReviews />} path="/my/reviews" />
                </Route>
                <Route element={<UserContainer />}>
                    <Route element={<UserProfile />} path="user/:userId/profile" />
                    <Route element={<UserMovies />} path="user/:userId/movies" />
                    <Route element={<UserReviews />} path="user/:userId/reviews" />
                    <Route element={<UserFollows />} path="user/:userId/follows" />
                </Route>
            </Route>
            <Route path="/login" element={<UserLogin loginUser={props.loginUser} />} />
            <Route path="/register" element={<UserRegistration />} />
            <Route path="/" element={<Navigate to="/movies" />} />
        </Routes>
    </BrowserRouter>;

export default AppRouter;
