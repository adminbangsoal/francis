import { LatihanSoalSekuensialRequest } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SoalSliceState {
  soalSekuensialRequest: LatihanSoalSekuensialRequest | null;
}

const initialState: SoalSliceState = {
  soalSekuensialRequest: null,
};

const SoalSlice = createSlice({
  name: "soal",
  initialState,
  reducers: {
    setSoalSekuensialRequest: (
      state,
      { payload }: PayloadAction<LatihanSoalSekuensialRequest>,
    ) => {
      state.soalSekuensialRequest = payload;
    },
  },
});

export const { setSoalSekuensialRequest } = SoalSlice.actions;
export default SoalSlice.reducer;
