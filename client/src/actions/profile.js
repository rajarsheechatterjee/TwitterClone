import axios from "axios";
import { setAlert } from "./alert";

import {
    GET_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    ACCOUNT_DELETED,
    GET_PROFILES,
    UPDATE_FOLLOWING,
} from "./types";

// Get current user's profile
export const getCurrentProfile = () => async (dispatch) => {
    try {
        const res = await axios.get("/api/profile/me");

        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

// Get all profiles
export const getProfiles = () => async (dispatch) => {
    dispatch({
        type: CLEAR_PROFILE,
    });
    try {
        const res = await axios.get("/api/profile/");

        dispatch({
            type: GET_PROFILES,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

// Get follow suggestions
export const getFollowSuggestions = () => async (dispatch) => {
    dispatch({
        type: CLEAR_PROFILE,
    });
    try {
        const res = await axios.get("/api/profile/suggestions/");

        dispatch({
            type: GET_PROFILES,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

// Get profile by id
export const getProfileById = (userId) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/profile/user/${userId}`);

        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

// Create or update a profile
export const createProfile = (formData, history, edit = false) => async (
    dispatch
) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const res = await axios.post("/api/profile", formData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });

        dispatch(
            setAlert(edit ? "Profile Updated" : "Profile Created", "success")
        );

        if (!edit) {
            history.push("/profile/me");
        }
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

// Delete a user's account, profile and tweets
export const deleteAccount = () => async (dispatch) => {
    if (window.confirm("Are you sure? This can NOT be undone!")) {
        try {
            await axios.delete(`/api/profile/`);

            dispatch({
                type: CLEAR_PROFILE,
            });

            dispatch({
                type: ACCOUNT_DELETED,
            });

            dispatch(
                setAlert("Your account has been permanently deleted", "info")
            );
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: err.response.statusText,
                    status: err.response.status,
                },
            });
        }
    }
};

// Follow a profile
export const followProfile = (id) => async (dispatch) => {
    try {
        const res = await axios.put(`/api/profile/follow/${id}`);

        dispatch({
            type: UPDATE_FOLLOWING,
            payload: {
                id,
                followers: res.data,
            },
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
