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

const Architectures = [
  'arm',
  'arm64',
  'aarch64',
  'mpis',
  'mpis64',
  'ppc64',
  'ppc64le',
  's390',
  's390x',
  'i386',
  'i686',
  'x86_64',
  'sparc',
];

export { Architectures, hardwareInfoType, core, Worker};

