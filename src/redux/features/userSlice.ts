import { ProfileResponse, SigninResponse, SignupResponse, User } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { setCookie } from "cookies-next";
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
        state.profile = {
          ...payload.data.user,
          profile_img: payload.data.user.profile_picture || "",
        };
        // Set email cookie for onboarding page
        setCookie("email", payload.data.user.email, {
          maxAge: 60 * 60 * 24, // 24 hours
          path: "/", // Ensure cookie is accessible across all routes
          sameSite: "lax", // Security setting
        });
        // Ensure token is saved to localStorage before redirect
        if (typeof window !== "undefined") {
          window.localStorage.setItem("token", token);
          // Wait a bit for redux-persist to save state and cookie to be set
          setTimeout(() => {
            if (!payload.data.user.onboard_date) {
              // Use href with query param as fallback to ensure email is available
              window.location.href = `/onboarding?email=${encodeURIComponent(payload.data.user.email)}`;
            } else {
              window.location.pathname = "/dashboard";
            }
          }, 300);
        }
      },
    );
    builder.addMatcher(
      authApi.endpoints.googleSignIn.matchFulfilled,
      (state, { payload }: PayloadAction<SigninResponse>) => {
        const token = payload.data.token;
        state.token = token;
        state.profile = {
          ...payload.data.user,
          profile_img: payload.data.user.profile_picture || "",
        };
        // Set email cookie for onboarding page
        setCookie("email", payload.data.user.email, {
          maxAge: 60 * 60 * 24, // 24 hours
          path: "/", // Ensure cookie is accessible across all routes
          sameSite: "lax", // Security setting
        });
        // Ensure token is saved to localStorage before redirect
        if (typeof window !== "undefined") {
          window.localStorage.setItem("token", token);
          // Wait a bit for redux-persist to save state and cookie to be set
          setTimeout(() => {
            if (!payload.data.user.onboard_date) {
              // Use href with query param as fallback to ensure email is available
              window.location.href = `/onboarding?email=${encodeURIComponent(payload.data.user.email)}`;
            } else {
              window.location.pathname = "/dashboard";
            }
          }, 300);
        }
      },
    );
    builder.addMatcher(
      authApi.endpoints.register.matchFulfilled,
      (state, { payload }: PayloadAction<SignupResponse>) => {
        const token = payload.data.token;
        state.token = token;
        state.profile = {
          ...payload.data.user,
          profile_img: payload.data.user.profile_picture || "",
        };
        // Set email cookie for onboarding page
        setCookie("email", payload.data.user.email, {
          maxAge: 60 * 60 * 24, // 24 hours
          path: "/", // Ensure cookie is accessible across all routes
          sameSite: "lax", // Security setting
        });
        // Ensure token is saved to localStorage before redirect
        if (typeof window !== "undefined") {
          window.localStorage.setItem("token", token);
          // Wait a bit for redux-persist to save state
          setTimeout(() => {
            // User baru akan redirect ke onboarding
            // Use href with query param as fallback to ensure email is available
            window.location.href = `/onboarding?email=${encodeURIComponent(payload.data.user.email)}`;
          }, 100);
        }
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
