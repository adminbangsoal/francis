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
        state.profile = payload.data.user;
        if (!payload.data.user.onboard_date) {
          window.location.pathname = "/onboarding";
        } else {
          window.location.pathname = "/dashboard";
        }
      },
    );
    builder.addMatcher(
      authApi.endpoints.googleSignIn.matchFulfilled,
      (state, { payload }: PayloadAction<SigninResponse>) => {
        const token = payload.data.token;
        state.token = token;
        state.profile = payload.data.user;
        if (!payload.data.user.onboard_date) {
          window.location.pathname = "/onboarding";
        } else {
          window.location.pathname = "/dashboard";
        }
      },
    );
    builder.addMatcher(
      authApi.endpoints.register.matchFulfilled,
      (state, { payload }: PayloadAction<SignupResponse>) => {
        const token = payload.data.token;
        state.token = token;
        state.profile = payload.data.user;
        // User baru akan redirect ke onboarding
        window.location.pathname = "/onboarding";
      },
    );
    builder.addMatcher(
      authApi.endpoints.getProfile.matchFulfilled,
      (state, { payload }: PayloadAction<ProfileResponse>) => {
        state.profile = { ...payload.data };
      },
    );
  },
});

export const { logout, updateProfile } = userSlice.actions;
export default userSlice.reducer;
