import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    state: {
        isFetching: false,
    },
    user: {
        isAuthenticated: false,
    },
}


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setIsFetching: (state, action) => {
            state.state.isFetching = action.payload;
        },
        setUserDataOnLogin: (state, action) => {
            const { token, user } = action.payload;

            return {
                ...state,
                user: {
                    isAuthenticated: true,
                    token: token,
                    ...user,
                }
            };
        },
        setUserDataOnLogout: (state) => {
            return {
                ...state,
                user: {
                    isAuthenticated: false,
                }
            };
        },
        setUserDataOnUpdate: (state, action) => {
            const { user } = action.payload.user;

            return {
                ...state,
                user: {
                    ...state.user,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,

                },
            };
        },
        setUserApplications: (state, action) => {
            const id = action.payload;

            return {
                ...state,
                user: {
                    ...state.user,
                    applications: [...state.user.applications, id],
                },
            };
        },
    },
});

export const {
    setIsFetching,
    setUserDataOnLogin,
    setUserDataOnLogout,
    setUserDataOnUpdate,
    setUserApplications,
} = userSlice.actions;


export default userSlice.reducer;