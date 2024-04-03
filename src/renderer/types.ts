interface core {
  model: string;
  speed: number;
  times: string[];
}

interface hardwareInfoType {
  machineArch: string;
  ram: number;
  numCores: number;
  cores: core[];
}

export { hardwareInfoType, core };
