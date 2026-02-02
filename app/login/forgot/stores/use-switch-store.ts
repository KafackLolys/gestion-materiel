import { create } from "zustand"
type FormInterface = "email" | "code" | "new-password";

type FormStateType = {
  content: FormInterface
  setContent: (newContent: FormInterface) => void
  resetContent: () => void
}

export const useFormStateStore = create<FormStateType>((set) => ({
  content: "email",

  setContent: (newContent) =>
    set({ content: newContent }),

  resetContent: () =>
    set({ content: "email" }),
}))
