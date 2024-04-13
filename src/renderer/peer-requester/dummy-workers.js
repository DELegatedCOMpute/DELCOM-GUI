const dummyWorkers = {
  workers: [
    {
      name: 'WorkerA',
      hardware: {
        machineArch: 'x86_64',
        ram: 16,
        numCores: 4,
        cores: [
          {
            model: 'Intel i7',
            speed: 3.1,
            times: ['2023-04-01T12:00:00Z', '2023-04-02T12:00:00Z'],
          },
          {
            model: 'Intel i7',
            speed: 3.1,
            times: ['2023-04-03T12:00:00Z', '2023-04-04T12:00:00Z'],
          },
          {
            model: 'Intel i7',
            speed: 3.1,
            times: ['2023-04-05T12:00:00Z', '2023-04-06T12:00:00Z'],
          },
          {
            model: 'Intel i7',
            speed: 3.1,
            times: ['2023-04-07T12:00:00Z', '2023-04-08T12:00:00Z'],
          },
        ],
      },
    },
    {
      name: 'WorkerB',
      hardware: {
        machineArch: 'arm64',
        ram: 32,
        numCores: 8,
        cores: [
          {
            model: 'Apple M1',
            speed: 3.2,
            times: ['2023-04-01T13:00:00Z', '2023-04-02T13:00:00Z'],
          },
          {
            model: 'Apple M1',
            speed: 3.2,
            times: ['2023-04-03T13:00:00Z', '2023-04-04T13:00:00Z'],
          },
          {
            model: 'Apple M1',
            speed: 3.2,
            times: ['2023-04-05T13:00:00Z', '2023-04-06T13:00:00Z'],
          },
          {
            model: 'Apple M1',
            speed: 3.2,
            times: ['2023-04-07T13:00:00Z', '2023-04-08T13:00:00Z'],
          },
        ],
      },
    },
    {
      name: 'WorkerC',
      hardware: {
        machineArch: 'x86_64',
        ram: 64,
        numCores: 16,
        cores: [
          {
            model: 'AMD Ryzen 9',
            speed: 3.7,
            times: ['2023-04-01T14:00:00Z', '2023-04-02T14:00:00Z'],
          },
          {
            model: 'AMD Ryzen 9',
            speed: 3.7,
            times: ['2023-04-03T14:00:00Z', '2023-04-04T14:00:00Z'],
          },
          {
            model: 'AMD Ryzen 9',
            speed: 3.7,
            times: ['2023-04-05T14:00:00Z', '2023-04-06T14:00:00Z'],
          },
          {
            model: 'AMD Ryzen 9',
            speed: 3.7,
            times: ['2023-04-07T14:00:00Z', '2023-04-08T14:00:00Z'],
          },
        ],
      },
    },
    {
      name: 'WorkerD',
      hardware: {
        machineArch: 'x86_64',
        ram: 8,
        numCores: 2,
        cores: [
          {
            model: 'Intel Celeron',
            speed: 2.8,
            times: ['2023-04-01T15:00:00Z', '2023-04-02T15:00:00Z'],
          },
          {
            model: 'Intel Celeron',
            speed: 2.8,
            times: ['2023-04-03T15:00:00Z', '2023-04-04T15:00:00Z'],
          },
        ],
      },
    },
    {
      name: 'WorkerE',
      hardware: {
        machineArch: 'x86_64',
        ram: 32,
        numCores: 6,
        cores: [
          {
            model: 'Intel Xeon',
            speed: 3.5,
            times: ['2023-04-01T16:00:00Z', '2023-04-02T16:00:00Z'],
          },
          {
            model: 'Intel Xeon',
            speed: 3.5,
            times: ['2023-04-03T16:00:00Z', '2023-04-04T16:00:00Z'],
          },
          {
            model: 'Intel Xeon',
            speed: 3.5,
            times: ['2023-04-05T16:00:00Z', '2023-04-06T16:00:00Z'],
          },
          {
            model: 'Intel Xeon',
            speed: 3.5,
            times: ['2023-04-07T16:00:00Z', '2023-04-08T16:00:00Z'],
          },
        ],
      },
    },
    {
      name: 'WorkerF',
      hardware: {
        machineArch: 'arm64',
        ram: 8,
        numCores: 4,
        cores: [
          {
            model: 'Qualcomm Snapdragon',
            speed: 2.84,
            times: ['2023-04-01T17:00:00Z', '2023-04-02T17:00:00Z'],
          },
          {
            model: 'Qualcomm Snapdragon',
            speed: 2.84,
            times: ['2023-04-03T17:00:00Z', '2023-04-04T17:00:00Z'],
          },
          {
            model: 'Qualcomm Snapdragon',
            speed: 2.84,
            times: ['2023-04-05T17:00:00Z', '2023-04-06T17:00:00Z'],
          },
          {
            model: 'Qualcomm Snapdragon',
            speed: 2.84,
            times: ['2023-04-07T17:00:00Z', '2023-04-08T17:00:00Z'],
          },
        ],
      },
    },
    {
      name: 'WorkerG',
      hardware: {
        machineArch: 'x86_64',
        ram: 128,
        numCores: 32,
        cores: [
          {
            model: 'AMD EPYC',
            speed: 3.4,
            times: ['2023-04-01T18:00:00Z', '2023-04-02T18:00:00Z'],
          },
          {
            model: 'AMD EPYC',
            speed: 3.4,
            times: ['2023-04-03T18:00:00Z', '2023-04-04T18:00:00Z'],
          },
          {
            model: 'AMD EPYC',
            speed: 3.4,
            times: ['2023-04-05T18:00:00Z', '2023-04-06T18:00:00Z'],
          },
          {
            model: 'AMD EPYC',
            speed: 3.4,
            times: ['2023-04-07T18:00:00Z', '2023-04-08T18:00:00Z'],
          },
        ],
      },
    },
    {
      name: 'WorkerH',
      hardware: {
        machineArch: 'arm64',
        ram: 8,
        numCores: 4,
        cores: [
          {
            model: 'Qualcomm Snapdragon',
            speed: 2.84,
            times: ['2023-04-01T17:00:00Z', '2023-04-02T17:00:00Z'],
          },
          {
            model: 'Qualcomm Snapdragon',
            speed: 2.84,
            times: ['2023-04-03T17:00:00Z', '2023-04-04T17:00:00Z'],
          },
          {
            model: 'Qualcomm Snapdragon',
            speed: 2.84,
            times: ['2023-04-05T17:00:00Z', '2023-04-06T17:00:00Z'],
          },
          {
            model: 'Qualcomm Snapdragon',
            speed: 2.84,
            times: ['2023-04-07T17:00:00Z', '2023-04-08T17:00:00Z'],
          },
        ],
      },
    },
    {
      name: 'WorkerI',
      hardware: {
        machineArch: 'x86_64',
        ram: 128,
        numCores: 32,
        cores: [
          {
            model: 'AMD EPYC',
            speed: 3.4,
            times: ['2023-04-01T18:00:00Z', '2023-04-02T18:00:00Z'],
          },
          {
            model: 'AMD EPYC',
            speed: 3.4,
            times: ['2023-04-03T18:00:00Z', '2023-04-04T18:00:00Z'],
          },
          {
            model: 'AMD EPYC',
            speed: 3.4,
            times: ['2023-04-05T18:00:00Z', '2023-04-06T18:00:00Z'],
          },
          {
            model: 'AMD EPYC',
            speed: 3.4,
            times: ['2023-04-07T18:00:00Z', '2023-04-08T18:00:00Z'],
          },
        ],
      },
    },
  ],
};

export default dummyWorkers;
