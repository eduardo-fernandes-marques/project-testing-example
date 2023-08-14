export const useStepContextMock = {
  action: {
    getStatus: jest.fn(),
    getSteps: () => [],
    isFinishStep: jest.fn(),
    setNext: jest.fn(),
    setPrevious: jest.fn(),
    setWithoutEcommerceFlow: jest.fn(),
  },
  state: {
    flow: {},
    current: {
      value: 1,
      title: 'fake title',
      description: 'fake description',
      component: jest.fn(),
    },
  },
};
