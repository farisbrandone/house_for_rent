import { create } from "zustand";

interface mobileNavStore {
  collapsed: boolean;
  value: string;
  payss: string;
  ville: string;
  offre: string;
  onChangePays: (elt: string) => void;
  onExpand: () => void;
  onCollapse: () => void;
  modifyPays: (elt: string) => void;
  modifyVille: (elt: string) => void;
  modifyOffre: (elt: string) => void;
}

export const useMobileStore = create<mobileNavStore>((set) => ({
  collapsed: false,
  value: "",
  payss: "",
  ville: "",
  offre: "",
  onChangePays: (newValue: string) =>
    set((state) => ({ collapsed: state.collapsed, value: newValue })),
  onExpand: () => set((state) => ({ collapsed: false, value: state.value })),
  onCollapse: () => set((state) => ({ collapsed: true, value: state.value })),
  modifyPays: (newValue: string) =>
    set((state) => ({
      collapsed: state.collapsed,
      value: state.value,
      payss: newValue,
      ville: state.ville,
      offre: state.offre,
    })),
  modifyVille: (newValue: string) =>
    set((state) => ({
      collapsed: state.collapsed,
      value: state.value,
      payss: state.payss,
      ville: newValue,
      offre: state.offre,
    })),
  modifyOffre: (newValue: string) =>
    set((state) => ({
      collapsed: state.collapsed,
      value: state.value,
      payss: state.payss,
      ville: state.ville,
      offre: newValue,
    })),
}));
