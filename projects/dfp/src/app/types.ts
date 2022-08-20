export type Option<T = string, L = string> = {
  value: T;
  checked?: boolean;
  label: L;
};
