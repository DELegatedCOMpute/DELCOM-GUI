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

type workerType = {
  workerID: string;
  workerInfo: {
    cpus: string | any[];
    ram: number;
    machineArch: string;
  };
};

const Architectures = [
  'arm',
  'arm64',
  'ia32',
  'loong64',
  'mips',
  'mipsel',
  'ppc',
  'ppc64',
  'riscv64',
  's390',
  's390x',
  'x64',
];

const states = {
  NOTHINGDONE: 0,
  CLICKEDRUN: 1,
  JOBASSIGNED: 2,
  FILESSENT: 3,
  JOBDONE: 4,
};

export { Architectures, hardwareInfoType, core, workerType, states };
