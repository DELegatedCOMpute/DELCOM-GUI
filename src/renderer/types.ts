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

type Worker = {
  name: string;
  hardware: hardwareInfoType;
};

export { hardwareInfoType, core, Worker};

