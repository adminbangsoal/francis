"use client";
import type { Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { logout } from "../features/userSlice";

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action: any) => {
    if (isRejectedWithValue(action)) {
      if (
        action.payload.data?.error?.message ==
        "You have exceeded the time limit"
      ) {
        window.location.href = window.location.origin + "/try-out";
        return;
      }

      if (
        action.payload?.data?.error?.message ==
          "You have not started this set" ||
        action.payload?.data?.error?.message ==
          "Question not found in tryout set"
      ) {
        return;
      }

      if (
        action.payload?.data?.error?.message?.includes(
          "You have submitted this tryout on",
        )
      ) {
        toast.success("Tryout Sudah Dikerjakan ✅", {
          id: "tryout-submitted",
        });
        window.location.href = window.location.origin + "/try-out";
      }

      if (action.meta?.arg?.endpointName == "getProfile") {
        return;
      } else if (
        action?.payload.status == 401 &&
        action.meta?.arg?.endpointName != "passwordLogin" &&
        action.meta?.arg?.endpointName != "verifyMailOtp" &&
        action.meta?.arg?.endpointName != "loginEmail" &&
        action.meta?.arg?.endpointName != "forgotPassword" &&
        action.meta?.arg?.endpointName != "getTOHistoryQuestionAnalytics"
      ) {
        api.dispatch(logout());
        return;
      } else if (
        action?.payload.status == 405 ||
        action?.payload.status == 406
      ) {
        // password login, dont return toast
      } else if (
        action?.payload?.data?.error?.message == "Not enough questions" ||
        action?.payload?.data?.error?.message ==
          "Timed question is still running" ||
        action?.payload?.data?.error?.message ==
          "You have a running timed question" ||
        action?.payload?.data?.error?.message == "Attempt not found" ||
        action?.payload?.data?.error?.message ==
          "We are still calculating your tryout score, please wait." ||
        action?.payload?.data?.error?.message ==
          "You have not attempt this tryout"
      ) {
        console.error(action?.payload?.data?.error?.message);
        // prevent toast
      } else {
        const errorData =
          action.payload.data?.error?.message ||
          action.payload.data?.message ||
          action.error.message;

        if (Array.isArray(errorData)) {
          errorData.forEach((message) => {
            toast.error(message);
          });
        } else if (typeof errorData === "string") {
          toast.error(errorData);
        }
      }
    }
    return next(action);
  };
