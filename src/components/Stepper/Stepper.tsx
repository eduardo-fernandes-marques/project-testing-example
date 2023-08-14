import { useStepContext } from '@contexts/step';

import * as S from './Stepper.styles';

export const Stepper: React.FC = () => {
  const {
    action: { getStatus, getSteps, isFinishStep },
    state: {
      current: { value: current },
    },
  } = useStepContext();

  return (
    <S.Wrapper>
      {getSteps().map(({ value }) => (
        <S.Step key={value} title={`Etapa ${value}`}>
          <S.WrapperStepper completed={current > value}>
            {current > value ? (
              <svg
                aria-label={`Etapa ${value}: completada`}
                name="success-outline"
                color="primary.base"
              />
            ) : (
              value
            )}
          </S.WrapperStepper>

          {isFinishStep(value) && <S.WrapperDivide background={getStatus(value)} />}
        </S.Step>
      ))}
    </S.Wrapper>
  );
};
