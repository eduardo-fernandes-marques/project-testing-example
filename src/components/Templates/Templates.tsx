import React from 'react';

import type { Template } from '@models/flow';

import { Card } from './Card';
import * as S from './Templates.styles';

export type Props = {
  onChange?: (value: string) => void;
  payload?: Template[];
  defaultValue?: string;
};
export const Templates: React.FC<Props> = ({ defaultValue, onChange, payload }) => {
  const [state, setState] = React.useState<string>(defaultValue as string);

  const [active, setActive] = React.useState(0);
  const count = payload?.length || 0;

  React.useEffect(() => {
    if (payload) {
      const template = payload[active]?.name || '';

      onChange && onChange(template);

      setState(template);
    }
  }, [active, onChange, payload]);

  const hasNext = React.useMemo(() => active < count - 1, [active, count]);

  return (
    <S.Wrapper>
      <S.Content>
        {active > 0 && (
          <S.ActionButton
            aria-label="anterior"
            onClick={() => setActive((index) => index - 1)}
            color="primary.base"
            className="left"
          >
            <svg name="chevron-left-outline" color="primary.base" />
          </S.ActionButton>
        )}

        {payload?.map(({ href, image, name, segment }, index: number) => (
          <S.WrapperCard
            key={name}
            absoluteOffset={Math.abs(active - index) / 3}
            direction={Math.sign(active - index)}
            display={Math.abs(active - index)}
            offset={(active - index) / 3}
            opacity={Math.abs(active - index)}
          >
            <Card
              href={href}
              isActive={name === state}
              image={{ src: image, alt: `${name} template` }}
              segment={segment}
              badge={{
                content: 'Mais popular',
                variation: 'trend',
              }}
            />
          </S.WrapperCard>
        ))}

        {hasNext && (
          <S.ActionButton
            aria-label="próximo"
            onClick={() => setActive((index) => index + 1)}
            color="primary.base"
            className="right"
          >
            <svg name="chevron-right-outline" color="primary.base" />
          </S.ActionButton>
        )}
      </S.Content>
    </S.Wrapper>
  );
};
