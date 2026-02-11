import { ProfileResponse, SigninResponse, SignupResponse, User } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { authApi } from "../api/authApi";

interface UserSliceState {
  token: string | null;
  profile: User | null;
}

const initialState: UserSliceState = {
  token: null,
  profile: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      storage.removeItem("persist:root");
      window.localStorage.removeItem("token");
      state.profile = null;
      state.token = null;
      window.location.pathname = "/login";
    },
    updateProfile: (state, { payload }: PayloadAction<User>) => {
      state.profile = payload;
      if (window.location.pathname === "/onboarding") {
        window.location.pathname = "/dashboard";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }: PayloadAction<SigninResponse>) => {
        const token = payload.data.token;
        state.token = token;
        if (payload.data.user.onboard_date) {
          state.profile = payload.data.user;
        }
      },
    ),
      builder.addMatcher(
        authApi.endpoints.getProfile.matchFulfilled,
        (state, { payload }: PayloadAction<ProfileResponse>) => {
          state.profile = { ...payload.data };
        },
      ),
      builder.addMatcher(
        authApi.endpoints.register.matchFulfilled,
        (state, { payload }: PayloadAction<SignupResponse>) => {
          state.token = payload.data;
        },
      ),
      builder.addMatcher(
        authApi.endpoints.passwordLogin.matchFulfilled,
        (state, { payload }: PayloadAction<SigninResponse>) => {
          const token = payload.data.token;
          state.token = token;
          if (payload.data.user.onboard_date) {
            state.profile = payload.data.user;
          }
          window.location.pathname = "/dashboard";
        },
      );
    builder.addMatcher(
      authApi.endpoints.forgotPassword.matchFulfilled,
      (state, { payload }: PayloadAction<SigninResponse>) => {
        const token = payload.data.token;
        state.token = token;
        if (payload.data.user.onboard_date) {
          state.profile = payload.data.user;
        }
        window.location.pathname = "/dashboard";
      },
    );
    builder.addMatcher(
      authApi.endpoints.verifyMailOtp.matchFulfilled,
      (state, { payload }: PayloadAction<SigninResponse>) => {
        const token = payload.data.token;
        state.token = token;
        state.profile = payload.data.user;
        window.location.pathname = "/onboarding";
      },
    ),
      builder.addMatcher(
        authApi.endpoints.loginEmail.matchFulfilled,
        (state, { payload }: PayloadAction<SigninResponse>) => {
          const token = payload.data.token;
          state.token = token;
          state.profile = payload.data.user;
          window.location.pathname = "/dashboard";
        },
      ),
      builder.addMatcher(
        authApi.endpoints.verifyForgotPasswordOtp.matchFulfilled,
        (state, { payload }: PayloadAction<SigninResponse>) => {
          const token = payload.data.token;
          state.token = token;
          state.profile = payload.data.user;
          window.location.pathname = "/dashboard";
        },
      );
  },
});

export const { logout, updateProfile } = userSlice.actions;
export default userSlice.reducer;
